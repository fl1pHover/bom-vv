import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import ChangeAgent from '@/components/Profile/ChangeAgent';
import ProfileImage from '@/components/Profile/profileImage';
import ProfileInput from '@/components/Profile/profileInput';
import Socials from '@/components/Profile/socials';
import urls from '@/constants/api';
import { LoadingButton } from '@/lib/Button';
import { STYLES } from '@/styles/index';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import WhiteBox from '@/util/product/WhiteBox';
import { Image, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Input } from 'postcss';
import { Fragment, useState } from 'react';
import { BiEdit } from 'react-icons/bi';

const GroupLayout = ({ title, children, className = '' }) => (
  <div className={mergeNames('flex flex-col justify-start gap-3', className)}>
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">{children}</div>
  </div>
);

const Profile = ({
  user,
  images = [],
  generalData = {},
  setImages = () => {},
  setGeneralData = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username,
    phone: user?.phone,
    userType: user?.userType,
    birthday: user?.birthday,
  });
  const [orgData, setOrgData] = useState({
    orgName: '',
    orgRegister: '',
    orgLocation: '',
    orgCertification: [],
  });
  const [agentData, setAgentData] = useState({
    orgName: '',
    orgCertification: [],
    images: [],
    orgLocation: '',
    firstName: '',
    lastName: '',
    register: '',
  });
  const [agentPersonalCard, setAgentPersonal] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();
  const [socials, setSocials] = useState([
    {
      name: 'facebook',
      url: user?.socials[0]?.url ?? '',
    },
    {
      name: 'instagram',
      url: user?.socials[1]?.url ?? '',
    },
    {
      name: 'telegram',
      url: user?.socials[2]?.url ?? '',
    },
  ]);

  const handleEdit = async () => {
    setIsLoading(true);

    if (edit) {
      const token = getCookie('token');
      let f = new FormData();
      let image = new FormData();
      orgData.orgCertification?.map((prev) => {
        image.append('images', prev);
      });
      await axios
        .post(`${urls['test']}/ad/uploadFields`, image, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((d) => f.append('images', d.data));

      f.append('username', userData.username);
      f.append('phone', userData.phone);
      f.append(
        'socials',
        JSON.stringify([
          {
            url: socials[0].url,
            name: socials[0].name,
          },
          {
            url: socials[1].url,
            name: socials[1].name,
          },
          {
            url: socials[2].url,
            name: socials[2].name,
          },
        ])
      );
      f.append('birthday', userData.birthday);

      if (orgData.orgCertification != '') {
        let oFile = new FormData();
        orgData.orgCertification?.map((prev) => {
          oFile.append('images', prev);
        });
        await axios
          .post(`${urls['test']}/ad/uploadFields`, oFile, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((d) => {
            f.append('userType', 'organization');
            f.append('status', 'pending');
            f.append(
              'organizationAddition',
              JSON.stringify([
                {
                  organizationName: orgData.orgName,
                  organizationCertificationCopy: d.data[0],

                  location: {
                    lng: orgData.orgLocation,
                    lat: orgData.orgLocation,
                  },

                  organizationRegisterNumber: orgData.orgRegister,
                },
              ])
            );
          });
      }

      if (agentData.orgCertification != '') {
        let oFile = new FormData();
        agentData.orgCertification?.map((prev) => {
          oFile.append('images', prev);
        });
        agentPersonalCard?.map((prev) => {
          oFile.append('images', prev);
        });
        await axios
          .post(`${urls['test']}/ad/uploadFields`, oFile, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((d) => {
            console.log(d.data);
            f.append('userType', 'agent');
            f.append('status', 'pending');
            f.append(
              'agentAddition',
              JSON.stringify([
                {
                  organizationName: agentData.orgName,
                  organizationContract: d.data[0],
                  identityCardFront: d.data[1],
                  identityCardBack: d.data[2],
                  firstName: agentData.firstName,
                  lastName: agentData.lastName,
                  registerNumber: agentData.register,
                  location: {
                    lng: agentData.orgLocation,
                    lat: agentData.orgLocation,
                  },
                },
              ])
            );
          });
      }
      try {
        await axios
          .put(`${urls['test']}/user`, f, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              charset: 'UTF-8',
            },
          })
          .then((d) => router.reload());
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setEdit(!edit);
      }
    }
    setEdit(!edit);
    setIsLoading(false);
  };

  return (
    <div className="flex-col h-full">
      <div
        className={mergeNames(
          'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2',
          'gap-y-6 gap-x-10',
          'py-5'
        )}
      >
        <GroupLayout title="Овог Нэр">
          <ProfileInput
            edit={edit}
            ph={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            item="username"
          />
        </GroupLayout>

        <GroupLayout title="Утас">
          <ProfileInput
            type="tel"
            ph={userData.phone}
            item="phone"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
            edit={edit}
          />
        </GroupLayout>

        <GroupLayout title="Хэрэглэгчийн төрөл" className="">
          <p className="flex items-center gap-4 italic font-semibold uppercase">
            {user?.userType == 'default'
              ? 'Энгийн'
              : user?.userType == 'agent'
              ? 'Агент'
              : user?.userType == 'organization'
              ? 'Байгууллага'
              : user?.userType}
            {edit && user && (
              <Fragment>
                <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={user?.userType == 'default'}
                  setImage={setAgentPersonal}
                  agent={false}
                />
                <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={false}
                  setImage={setAgentPersonal}
                  agent={user?.userType == 'default'}
                />
              </Fragment>
            )}
          </p>
        </GroupLayout>
        {/* <GroupLayout title="Хэрэглэгчийн төрөл" className="">
          <div
            className={mergeNames(
              'flex flex-row justify-center gap-4',
              edit ? ' ' : 'cursor-not-allowed'
            )}
          >
            {['default', 'agent', 'organization'].map((text, id) => {
              return (
                <ButtonSelectItem
                  key={id}
                  text={id == 0 ? 'Энгийн' : id == 1 ? 'Агент' : 'Байгууллага'}
                  isSelected={userData.userType == text}
                  onClick={() =>
                    edit
                      ? setUserData((prev) => ({ ...prev, userType: text }))
                      : null
                  }
                  edit={edit}
                  disabled={edit ? false : true}
                />
              );
            })}
          </div>
        </GroupLayout> */}

        <GroupLayout title="Төрсөн өдөр">
          <ProfileInput
            value={moment(
              userData?.birthday ?? Date.now(),
              'YYYY-MM-DD'
            ).format('YYYY-MM-DD')}
            type="date"
            item="date"
            edit={edit}
            ph={'01-02-2002'}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, birthday: e.target.value }))
            }
          />
        </GroupLayout>

        <Socials edit={edit} socials={socials} setSocials={setSocials} />

        <GroupLayout title="Профайл зураг" className="col-span-1/2">
          {edit ? (
            <ProfileImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            <div className="border-2 border-blue-200 rounded-md border-500">
              <Image
                className="object-cover object-center  h-[25vh] overflow-hidden bg-gray-300 aspect-square "
                alt="Current Profile"
                src={
                  user?.profileImg ??
                  'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
                }
              />
            </div>
          )}
        </GroupLayout>
        <div className="grid grid-cols-1">
          <GroupLayout title="Бүртгэлтэй Имэйл" className="col-span-full">
            <p className="italic">{user?.email}</p>
          </GroupLayout>
        </div>
      </div>

      <button
        className={mergeNames(
          // 'hidden',
          'text-white  transition-all ease-linear',
          'float-right mt-5 px-5 py-2 font-bold w-32 rounded-[30px]',
          edit ? 'bg-mainBlue hover:bg-blue-900' : 'bg-red-500'
        )}
        onClick={handleEdit}
      >
        <p>{edit ? 'Хадгалах' : 'Засварлах'}</p>
      </button>
    </div>
  );
};

export default Profile;
