import React, { useEffect } from 'react';
import { BiArea, BiDoorOpen } from 'react-icons/bi';

import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';

import urls from '@/constants/api';
import { DButton, ImageCount } from '@/lib/Button';
import Tip from '@/lib/Tip';
import Alerting from '@/util/Alert';
import mergeNames from '@/util/mergeNames';
import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import currency from 'currency.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import EditAd from '../ad/edit';
import AdCardButton from './adCardButton';
import { stopPropagation } from '@/context/functions';

function Card({
  item,
  deleteFunc = {},
  isDelete = false,
  data,
  setData,
  admin = false,
  changeAd = {},
}) {
  const router = useRouter();
  const user = getCookie('user');

  const token = getCookie('token');
  const [drop, setDrop] = useState(false);
  const [btn, setBtn] = useState('');

  const pushRouter = async () => {
    if (user) {
      item?._id &&
        (await axios
          .get(`${urls['test']}/ad/view/${item.num}/${JSON.parse(user)._id}`)
          .then((d) => router.push(`/product/${item.num}`)));
    } else {
      item?._id && router.push(`/product/${item.num}`);
    }
  };
  useEffect(() => {
    if (btn) router.push(btn);
  }, [btn]);
  return (
    // <Skeleton>
    <Skeleton isLoaded>
      <div
        className={mergeNames(
          'relative overflow-hidden rounded-md md:min-h-[350px] min-h-[300px]  shadow-md bg-zinc-200 group',
          isDelete &&
            item?.adStatus == 'pending' &&
            ' border-yellow-400/60 border-4 ',
          isDelete &&
            item?.adStatus == 'created' &&
            'border-teal-400/60 border-4 ',
          isDelete && item?.adStatus == 'deleted' && 'border-red-400 border-4'
        )}
      >
        {/* zarin zurag absolute  */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full cursor-pointer"
          onClick={() => {
            pushRouter();
          }}
        >
          {item?.images && (
            <Image
              src={item?.images[0] ?? '/images/noImage.png'}
              alt=" зар"
              layout="fill"
              objectFit="cover"
              className={mergeNames(
                'group-hover:scale-125 transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0 ',
                'text-center grid place-items-center font-bold'
              )}
            />
          )}

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div>
        </div>
        {/* Zariin body  */}
        <div
          className="relative flex items-start justify-between flex-1 w-full h-full px-3 py-2 cursor-pointer"
          onClick={() => {
            pushRouter();
          }}
        >
          <Tip lbl="Зарын эзэн">
            <button
              className="relative overflow-hidden rounded-full w-9 h-9 bg-mainBlossom"
              onClick={(e) => {
                stopPropagation(e);
                router.push(`/account/${item.user._id}`);
              }}
            >
              <Image
                src={item?.user?.profileImg ?? '/images/logo/bom-white.png'}
                alt="BOM logo"
                objectFit="cover"
                layout="fill"
                className={mergeNames(item?.user?.profileImg ? '' : ' p-2')}
              />
            </button>
          </Tip>
          {isDelete ? (
            // <DButton onClick={deleteFunc} />
            <div
              className="relative flex flex-col items-center gap-2 rounded-full "
              onMouseEnter={() => setDrop(true)}
              onMouseLeave={() => setDrop(false)}
            >
              <button>
                <BsThreeDots className="z-10 w-8 h-8 p-1 text-lg bg-white rounded-full" />
              </button>

              <div
                className={mergeNames(
                  drop
                    ? 'h-auto flex flex-col items-center justify-center top-10 cursor-not-allow opacity-100'
                    : 'invisible opacity-0',
                  'transition-all ease-in-out duration-300 overflow-hidden bg-white/30 p-1 rounded-full '
                )}
              >
                <EditAd
                  ads={data}
                  setData={setData}
                  admin={admin}
                  data={item}
                  onNext={async (e) => {
                    stopPropagation(e);
                    await axios
                      .put(`${urls['test']}/ad/${item._id}`, item, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Access-Control-Allow-Headers': '*',
                          'Content-Type': 'application/json',
                          charset: 'UTF-8',
                        },
                      })
                      .then((d) => console.log(d.data));
                  }}
                >
                  <AiFillEdit />
                </EditAd>

                <div className="h-1" />

                {item.adStatus == 'deleted' ? (
                  <Alerting
                    isDelete={'Устгах'}
                    btn={<DButton onClick={deleteFunc} isDelete={true} />}
                    onclick={deleteFunc}
                  />
                ) : (
                  <Alerting
                    isDelete={'Сэргээх'}
                    btn={<DButton onClick={deleteFunc} isDelete={false} />}
                    onclick={deleteFunc}
                  />
                )}

                <div className="h-1" />

                {item.adType == 'default' && (
                  <Tip lbl="Онцгой зар болгох">
                    <Alerting
                      body={'Танаас 10,000 enunit хасагдах болохыг анхаарна уу'}
                      isDelete={'Онцгой зар болгох'}
                      btn={<DButton onClick={deleteFunc} isDelete={false} />}
                      onclick={changeAd}
                    />
                  </Tip>
                )}
              </div>
            </div>
          ) : (
            <ImageCount onClick={() => console.log('Zurag')}>
              {item?.images?.length}
            </ImageCount>
          )}
        </div>

        {/* Zariin info  */}
        <div
          className="absolute bottom-0 left-0 flex flex-col justify-end w-full p-2 mb-2 space-y-2 cursor-pointer"
          onClick={() => pushRouter()}
        >
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames('font-bold text-xl')}>
              {currency(
                `${item?.filters?.find((f) => f.type == 'price')?.input}`,
                {
                  separator: ',',
                  symbol: '₮ ',
                  pattern: `# !`,
                }
              )
                .format()
                .toString() ?? 0}
            </p>
          </div>
          <div className="relative flex flex-row justify-between w-full">
            <TextContainer
              title={item.title}
              description={item.positions?.location_id ?? ''}
            />
            <AdCardButton
              id={item?.num}
              stopPropagation={stopPropagation}
              adId={item?._id}
            />
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames('font-semibold text-white mt-0')}>
              {item?.subCategory?.name ?? ''}
            </p>
            <p className={mergeNames('font-semibold text-white mt-0')}>
              {item?.types[0] ?? ''}
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-1">
            {item?.filters?.map((p, i) => {
              return (
                <React.Fragment key={i}>
                  <ApartmentIconInfo p={p} />

                  {p.type === 'area' && (
                    <ItemContainer
                      lbl={p.name}
                      Icon={(props) => <BiArea {...props} text="" />}
                      text={calcValue(p.input, 'байхгүй', 'м.кв')}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {item?.adStatus == 'pending' && (
            <p
              className={mergeNames(
                'text-yellow-400 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              Хүлээгдэж байна...
            </p>
          )}
          {item?.adStatus == 'deleted' && (
            <p
              className={mergeNames(
                'text-red-400 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              Устгагдсан байна...
            </p>
          )}
        </div>
      </div>
    </Skeleton>
  );
}
const ApartmentIconInfo = ({ p }) => {
  // END YG ROOM MASTERBEDROOM AND BATHROOM IIN MEDEELEL BAIAGA
  return (
    <React.Fragment>
      {p && p.type === 'room' && (
        <ItemContainer
          lbl={p.name}
          text={calcValue(p.input, 'байхгүй')}
          Icon={(props) => <BiDoorOpen {...props} text="" />}
        />
      )}
      {p && p.type === 'masterBedroom' && (
        <ItemContainer
          lbl={p.name}
          Icon={(props) => <IoBedOutline {...props} text="" />}
          text={calcValue(p.input, 'байхгүй')}
        />
      )}
      {p && p.type === 'bathroom' && (
        <ItemContainer
          lbl={p.name}
          Icon={(props) => <TbBath {...props} text="" />}
          text={calcValue(p.input, 'байхгүй')}
        />
      )}
    </React.Fragment>
  );
};

const ItemContainer = ({ Icon = () => <></>, text = '', lbl }) => {
  return (
    <Tip lbl={lbl}>
      <div className="flex flex-row items-center gap-1">
        <Icon className="text-white" />
        <p className="text-white md:text-sm text-[12px]">{text}</p>
      </div>
    </Tip>
  );
};

const TextContainer = ({ title = '', description = '' }) => {
  return (
    <div className="w-2/3">
      <p className="text-sm font-semibold text-white uppercase truncate md:text-[16px]">
        {title}
      </p>
      <p className="text-[12px] md:text-base font-semibold truncate text-slate-200/90 first-letter:uppercase">
        {description}
      </p>
    </div>
  );
};

const typeCheck = (id, propmt) => {
  return id && id.name && id.name.toLowerCase() === propmt;
  // return id && id.name && id.name.toLowerCase() === propmt;
};

const calcValue = (props, checker = 'Байхгүй', suffix) => {
  // p?.value?.toLowerCase() === "байхгүй"

  if (props.toString().toLowerCase() === checker) return 0;
  if (props) {
    if (suffix) return `${props} ${suffix}`;
    return props;
  }
  return '-';
};
export default Card;
