import { ContainerXP } from '@/lib/Container';
import { STYLES } from '@/styles/index';

import mergeNames from '@/util/mergeNames';
import { Box, FormControl, FormLabel, Image, Input } from '@chakra-ui/react';
import { useAuth } from 'context/auth';
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

export default function Login() {
  const { logout, login, signup } = useAuth();
  const [signupCredential, setSignupcredential] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const router = useRouter();

  const [credential, setCredential] = useState({ email: '', password: '' });
  const signUp = () => {
    if (
      signupCredential.password == signupCredential.confirmPassword &&
      signupCredential.email != '' &&
      setSignupcredential.password != ''
    ) {
      signup(
        signupCredential.email,
        signupCredential.password,
        signupCredential.username,
        signupCredential.phone
      );
    }
  };

  const signIn = () => {
    if (credential.email && credential.password) {
      login(credential.email, credential.password);
      setCredential((credential) => ({
        ...credential,
        email: '',
        password: '',
      }));
    }
  };

  const [sign, setSign] = useState(1);

  return (
    <ContainerXP
      classname={mergeNames(
        'w-[auto] md:w-[800px] lg:w-[1000px] ',
        'relative grid grid-cols-1 md:grid-cols-2',
        'mx-auto my-5 md:my-10 rounded-xl overflow-hidden'
      )}
    >
      <div className="relative hidden bg-blue-900 md:block">
        <Image
          src="/images/city1.jpg"
          alt="login page side image"
          className="object-cover h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60" />
      </div>
      <div className="z-10 flex justify-center shadow-md w-[90%] md:w-full mx-auto h-[650px]">
        {sign == 1 && (
          <div className={mergeNames(STYLES.loginWidth)}>
            <Image
              src="/images/logo/bom-blue-text.png"
              alt="bom logo"
              className="w-[150px] mx-auto mb-10"
            />
            <h1 className="my-3 text-2xl font-bold text-center">??????????????</h1>

            <LoginComp
              credential={credential}
              setCredential={setCredential}
              fc={signIn}
            />

            <p className="my-10 text-sm font-bold text-gray-600">
              ???? ?????????????????????????? ???? ?????? ???????{' '}
              <button className="text-blue-800" onClick={() => setSign(2)}>
                ????????????????????
              </button>
            </p>
          </div>
        )}
        {sign == 2 && (
          <div className={mergeNames(STYLES.loginWidth)}>
            <Image
              src="/images/logo/bom-blue-text.png"
              alt="bom logo"
              className="w-[150px] mx-auto mb-10"
            />
            <h1 className="my-3 text-2xl font-bold text-center">????????????????????</h1>

            <SignUpComp
              credential={signupCredential}
              setCredential={setSignupcredential}
              fc={signUp}
            />
            <p className="text-sm font-bold text-gray-600 my-7">
              ???? ?????????? ???? ???????????????????? ?????{' '}
              <button className="text-blue-800" onClick={() => setSign(1)}>
                ??????????????
              </button>
            </p>
          </div>
        )}
      </div>
    </ContainerXP>
  );
}

export async function getServerSideProps({ req, res }) {
  // const res = await fetch(`${urls['test']}/category`);
  // const resjson = await res.json();
  const token = getCookie('token', { req, res });
  // const categories = resjson?.categories;
  if (token)
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  else {
    return {
      props: {
        route: false,
      },
    };
  }
}

export const LoginComp = ({ credential, setCredential, fc }) => {
  return (
    <form>
      <Box h={3} />

      <InputComp
        lbl={'???? ??-???????? ???????????? ?????????????? ????'}
        type="email"
        setValue={setCredential}
        value={credential.email}
        v={'email'}
      />
      <Box h={4} />
      <InputComp
        lbl={'???? ???????? ???????? ?????????????? ????'}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />

      <button className="float-right my-4 text-sm font-bold text-blue-800">
        ???????? ???? ???????????????
      </button>
      <Box h={10}></Box>
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="??????????????"
        stats="success"
        toastH="?????????????????? ??????????????????"
      /> */}

      <button
        type="submit"
        className={mergeNames('w-full h-auto py-3 ', STYLES.blueButton)}
        onClick={() => fc()}
      >
        ??????????????
      </button>
    </form>
  );
};

const MatchPass = () => {};

export const SignUpComp = ({ credential, setCredential, fc }) => {
  const [match, setMatch] = useState(true);

  const hm = () => {
    setMatch(credential.password == credential.confirmPassword);
  };

  return (
    <form>
      <Box h={3} />
      <InputComp
        lbl={'???? ??-???????? ???????????? ?????????????? ????'}
        type="email"
        value={credential.email}
        setValue={setCredential}
        v="email"
      />
      <Box h={4} />
      <InputComp
        lbl={'???? ???????????? ???????????????? ?????????????? ????'}
        type="tel"
        value={credential.phone}
        setValue={setCredential}
        v="phone"
      />
      <Box h={4} />
      <InputComp
        lbl={'???? ???????????????????????? ?????????? ?????????????? ????'}
        type="text"
        value={credential.username}
        setValue={setCredential}
        v="username"
      />
      <Box h={4} />
      <InputComp
        lbl={'???? ???????? ???????? ?????????????? ????'}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />
      <Box h={4} />
      <InputComp
        lbl={'???? ???????? ???????? ?????????? ?????????????? ????'}
        type="password"
        value={credential.confirmPassword}
        setValue={setCredential}
        v="confirmPassword"
      />

      {!match && (
        <p className={mergeNames('text-red-500')}>???????? ?????????? ???????? ?????????? ????</p>
      )}

      <Box h={7} />
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="??????????????????"
        stats="success"
        toastH="?????????????????? ??????????????????????"
      /> */}
      <button
        type="submit"
        className={mergeNames('w-full h-auto py-3', STYLES.blueButton)}
        onClick={() => {
          fc(), hm();
        }}
      >
        ????????????????????
      </button>
    </form>
  );
};

export const InputComp = ({ lbl, type, value, setValue, v }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box bg={'bg.input'} borderRadius={12} w="full">
      <FormControl variant={'floating'} id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9 "
          className={mergeNames(
            'relative text-[14px] rounded-full'
            // value.length == 0 ? 'border-red-500' : 'border-blue-600'
          )}
          type={type === 'password' ? (!show ? 'password' : 'text') : type}
          value={value}
          required
          onChange={(e) => {
            switch (v) {
              case 'email':
                setValue((value) => ({
                  ...value,
                  email: e.target.value,
                }));
                break;
              case 'phone':
                setValue((value) => ({
                  ...value,
                  phone: e.target.value,
                }));
                break;
              case 'password':
                setValue((value) => ({
                  ...value,
                  password: e.target.value,
                }));
                break;
              case 'confirmPassword':
                setValue((value) => ({
                  ...value,
                  confirmPassword: e.target.value,
                }));
                break;
              case 'username':
                setValue((value) => ({
                  ...value,
                  username: e.target.value,
                }));
                break;
              default:
                break;
            }
          }}
        />
        <FormLabel className={mergeNames('text-[14px] md:text-base ')}>
          {lbl}
        </FormLabel>

        {/* Show password */}
        {type === 'password' && (
          <div
            onClick={handleClick}
            className="absolute top-[50%] -translate-y-[50%] right-0 w-[40px] h-[40px] z-10 grid place-items-center cursor-pointer"
          >
            {show ? <BiHide /> : <BiShow />}
          </div>
        )}
      </FormControl>
    </Box>
  );
};
