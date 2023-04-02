import EditAd from '@/components/ad/edit';
import FilterAd from '@/components/Profile/filterAd';
import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { getJson } from '@/context/functions';
import { brk, STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Button, Checkbox, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
import * as XLSX from 'xlsx';
const Tab = ({ num, children }) => {
  const [activeTab, setActiveTab] = useState('');
  const handleClick = (event) => {
    setActiveTab(event.target.id);
  };
  return (
    <p
      className={mergeNames(
        'flex justify-between py-2 font-bold cursor-pointer',
        activeTab === num ? 'text-green-200' : 'text-red-200'
      )}
      onClick={() => setActiveTab(num)}
    >
      {children}
    </p>
  );
};

const RequestAds = ({ propAds, propAllAds }) => {
  const [ads, setAds] = useState({ ads: [], limit: 0 });

  const { user } = useAuth();
  const token = Cookies.get('token');
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState({
    ads: [],
    limit: 0,
  });
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];
  const getData = async () => {
    fetch(`${urls['test']}/ad/admin/all/${num}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => {
        let copyAds = [...ads.ads];
        let copyData = [...data.ads];
        setAds((prev) => ({
          ...prev,
          ads: copyAds.concat(d.ads),
          limit: ads.limit + d.limit,
        }));
        setData((prev) => ({
          ...prev,
          ads: copyData.concat(d.ads),
          limit: ads.limit + d.limit,
        }));
        let c = [],
          s = [];
        d?.ads?.map((ad) => {
          if (c.length > 0) {
            if (c.find((a) => a == ad.category.name) === undefined) {
              c.push(ad.category.name);
            }
          } else {
            c.push(ad.category.name);
          }
          if (s.length > 0) {
            if (s.find((a) => a == ad.subCategory.name) === undefined) {
              s.push(ad.subCategory.name);
            }
          } else {
            s.push(ad.subCategory.name);
          }
        });
        setCategories(c);
        setSubCategory(s);
      });
  };

  useEffect(() => {
    setAds(propAds);
    setData(propAds);

    let c = [],
      s = [];
    propAds?.ads?.map((ad) => {
      if (c.length > 0) {
        if (c.find((a) => a == ad.category.name) === undefined) {
          c.push(ad.category.name);
        }
      } else {
        c.push(ad.category.name);
      }
      if (s.length > 0) {
        if (s.find((a) => a == ad.subCategory.name) === undefined) {
          s.push(ad.subCategory.name);
        }
      } else {
        s.push(ad.subCategory.name);
      }
    });
    setCategories(c);
    setSubCategory(s);
  }, [propAds]);
  useEffect(() => {
    adStatusChecker();
  }, [checker]);
  useEffect(() => {
    getData();
  }, [num]);
  const verify = async (id) => {
    try {
      await axios
        .get(`${urls['test']}/ad/update/${id}/created`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((d) => {
          toast({
            title: `${d?.data?.num ?? ''} Зарыг нэмлээ.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAd = async (id) => {
    await fetch(`${urls['test']}/ad/update/${id}/deleted`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Headers': '*',
      },
    }).then((d) => {
      toast({
        title: `${d?.data?.num ?? ''} Зарыг устгалаа.`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  const exportExcel = (data) => {
    if (propAllAds) {
      let {
        apartmentJson,
        officeJson,
        factoryJson,
        garageJson,
        landJson,
        serviceJson,
      } = getJson(propAllAds);
      const apartmentSheet = XLSX.utils.json_to_sheet(apartmentJson);
      const officeSheet = XLSX.utils.json_to_sheet(officeJson);
      const factorySheet = XLSX.utils.json_to_sheet(factoryJson);
      const garageSheet = XLSX.utils.json_to_sheet(garageJson);
      const landSheet = XLSX.utils.json_to_sheet(landJson);
      const serviceSheet = XLSX.utils.json_to_sheet(serviceJson);
      const realStateBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(realStateBook, apartmentSheet, 'Орон сууц');
      XLSX.utils.book_append_sheet(realStateBook, officeSheet, 'Оффис');
      XLSX.utils.book_append_sheet(
        realStateBook,
        factorySheet,
        'Үйлдвэр агуулах объект'
      );
      XLSX.utils.book_append_sheet(
        realStateBook,
        garageSheet,
        'Гараж, контейнер, зөөврийн сууц'
      );
      XLSX.utils.book_append_sheet(realStateBook, landSheet, 'Газар');
      XLSX.utils.book_append_sheet(
        realStateBook,
        serviceSheet,
        'Худалдаа, үйлчилгээний талбай'
      );
      XLSX.writeFile(realStateBook, 'Datas.xlsx');
    }
  };
  const [content, setContent] = useState('');
  const [collapsedId, setCollapsed] = useState(false);
  const adStatusChecker = async () => {
    if (checker.pending) {
      let ad = ads.ads.filter((p) => p.adStatus == 'pending');
      setAds({
        ads: ad,
        limit: ads.limit,
      });
    } else {
      if (checker.create && ads) {
        let ad = ads.ads.filter((p) => p.adStatus == 'created');
        setAds({
          ads: ad,
          limit: ads.limit,
        });
      } else {
        if (checker.deleted && ads) {
          let ad = ads.ads.filter((p) => p.adStatus == 'deleted');
          setAds({
            ads: ad,
            limit: ads.limit,
          });
        } else {
          if (checker.sharing && ads) {
            let ad = ads.ads.filter((p) => p.adStatus == 'sharing');
            setAds({
              ads: ad,
              limit: ads.limit,
            });
          } else {
            if (checker.returned && ads) {
              let ad = ads.ads.filter((p) => p.adStatus == 'returned');
              setAds({
                ads: ad,
                limit: ads.limit,
              });
            } else {
              await getData();
            }
          }
        }
      }
    }
  };
  const [expand, setExpand] = useState(0);

  return (
    <Fragment>
      <div className="flex flex-row p-5 min-h-[60vh]">
        <div className="p-5 ">
          {/* <Text>Zariin dugaar: {a.num}</Text>
              <Button onClick={() => verify(a._id)}>verify</Button>
              <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className={mergeNames('flex flex-col gap-4 mt-5', brk)}>
            <div className="flex w-full gap-4">
              <FilterAd
                plc="Бүх төрөл"
                onChange={(e) => {
                  if (e.target.value != '') {
                    let ad = data.ads.filter(
                      (d) => d.category.name == e.target.value
                    );
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
                  } else {
                    setAds(data);
                  }
                }}
              >
                {categories?.map((p, i) => {
                  return (
                    <option value={p} key={i}>
                      {p}
                    </option>
                  );
                })}
              </FilterAd>
              <FilterAd
                plc="Бүх дэд төрөл"
                onChange={(e) => {
                  if (e.target.value != '') {
                    let ad = data.ads.filter(
                      (d) => d.subCategory.name == e.target.value
                    );
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
                  } else {
                    setAds(data);
                  }
                }}
              >
                {subCategory?.map((p, i) => {
                  return (
                    <option value={p} key={i}>
                      {p}
                    </option>
                  );
                })}
              </FilterAd>
            </div>
            <div className="flex flex-col justify-end">
              <Checkbox
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    create: e.target.checked,
                  }));
                }}
                isChecked={checker.create}
              >
                Нэмсэн зарууд
              </Checkbox>
              <Checkbox
                colorScheme="yellow"
                className="font-bold text-yellow-400 whitespace-nowrap"
                isChecked={checker.pending}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    pending: e.target.checked,
                  }));
                }}
              >
                Хүлээгдэж байгаа
              </Checkbox>
              <Checkbox
                colorScheme="red"
                className="font-bold text-red-400 whitespace-nowrap"
                isChecked={checker.deleted}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    deleted: e.target.checked,
                  }));
                }}
              >
                Устгасан зарууд
              </Checkbox>
              <Checkbox
                colorScheme="cyan"
                className="font-bold text-teal-400 whitespace-nowrap"
                isChecked={checker.sharing}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    sharing: e.target.checked,
                  }));
                }}
              >
                Хуваалцсан зар
              </Checkbox>
              <Checkbox
                colorScheme="cyan"
                className="font-bold text-primary whitespace-nowrap"
                isChecked={checker.returned}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    returned: e.target.checked,
                  }));
                }}
              >
                Буцаагдсан зар
              </Checkbox>
            </div>
          </div>
          <div className="w-full overflow-scroll">
            {ads?.ads && (
              <button
                className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                onClick={() => exportExcel(ads.ads)}
              >
                Excel татах
              </button>
            )}
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th width="10%">Дугаар</th>
                  <th>Гарчиг</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th>Зарын төрөл</th>
                  <th>Зарын статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {ads?.ads?.map((a, i) => {
                  let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td width="10%">{a.num}</td>
                      <td className="truncate ...">
                        {/* {a.title} */}
                        <Button
                          as="a"
                          className={mergeNames(
                            STYLES.blueButton,
                            'text-sm h-[30px]'
                          )}
                          target="_blank"
                          href={`/product/${a.num}`}
                          // onClick={() => router.push(`/product/${a.num}`)}
                        >
                          <a target="_blank">Орох</a>
                        </Button>
                      </td>
                      <td className="truncate ...">{a.description}</td>
                      <td
                        className={mergeNames(
                          'truncate ... font-bold',
                          a.adType == 'special' && 'text-purple-900',
                          a.adType == 'default' && 'text-primary'
                        )}
                      >
                        {a.adType}
                      </td>
                      <td
                        className={mergeNames(
                          'truncate ... font-bold',
                          a.adStatus == 'special' && 'text-yellow-400',
                          a.adStatus == 'created' && 'text-green-500',
                          a.adStatus == 'pending' && 'text-yellow-500',
                          a.adStatus == 'deleted' && 'text-red-400',
                          a.adStatus == 'default' && 'text-primary'
                        )}
                      >
                        {a.adStatus}
                      </td>
                      <td>
                        <div
                          className={mergeNames(
                            'flex flex-row justify-between'
                            // 'p-2 rounded-md bg-white',
                          )}
                        >
                          <button
                            onClick={() => {
                              if (expand == 0) {
                                setExpand(i + 1);
                              } else {
                                setExpand(0);
                              }
                            }}
                            className="float-left mx-0 text-lg text-black -rotate-90"
                          >
                            <MdOutlineArrowDropDownCircle
                              className={mergeNames(
                                expand == i + 1 ? 'text-blue-600 ' : ''
                              )}
                            />
                          </button>
                          <div
                            className={mergeNames(
                              expand == i + 1 ? 'flex' : 'hidden',
                              'justify-center  flex-end  gap-2'
                            )}
                            onClick={() => {
                              setExpand(0);
                            }}
                          >
                            {a.adStatus != 'created' && (
                              <button
                                onClick={() => verify(a._id)}
                                className={mergeNames(
                                  STYLES.button,
                                  'bg-teal-500 justify-center w-7 h-7 '
                                )}
                              >
                                <SiVerizon />
                              </button>
                            )}
                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                'bg-red-500 w-7 h-7 justify-center'
                              )}
                            >
                              <MdDelete />
                            </button>
                            <EditAd
                              setData={setAds}
                              ads={ads}
                              data={a}
                              admin={true}
                              onNext={async () => {
                                await axios
                                  .put(`${urls['test']}/ad/${a._id}`, a, {
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
                              <BiEdit />
                            </EditAd>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {propAllAds?.length >= num * 20 && (
              <ul className="flex float-right list-style-none">
                <li className="mx-2 disabled">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num + 1;
                      setNum(n);
                    }}
                  >
                    more
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default RequestAds;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls['test']}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await
      if (user?.userType == 'admin' || user?.userType == 'system') {
        const ads = await fetch(`${urls['test']}/ad/admin/all/${0}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allAds = await fetch(`${urls['test']}/ad/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adsJson = await ads.json();
        const allAdsJson = await allAds.json();
        return {
          props: {
            propAds: adsJson,
            propAllAds: allAdsJson,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
// <div className="flex flex-row p-5" key={i}>
//   {/* Dashboard */}
//   <div className="flex flex-col  text-white bg-mainBlossom w-[20%] p-4 rounded-xl">
//     <div className="flex flex-col">
//       <Tab
//         num={1}
//         className={mergeNames(
//           'flex justify-between py-2 font-bold cursor-pointer'
//         )}
//       >
//         Verify
//       </Tab>
//     </div>
//     {categories?.map(({ categoryName, submenu }, key) => {
//       return (
//         <div className="flex flex-col" key={key}>
//           <Tab
//             num={2}
//             className={mergeNames(
//               'flex justify-between py-2 font-bold cursor-pointer'
//             )}
//           >
//             {categoryName}
//             <button
//               // onClick={handleExpand}
//               onClick={() => {
//                 setCollapsed((prev) => {
//                   if (prev === categoryName.id) return false;
//                   return categoryName.id;
//                 });
//               }}
//             >
//               <AiFillCaretDown />
//             </button>
//           </Tab>
//           <ul
//             className={mergeNames(
//               'cursor-pointer ml-10',
//               expand ? 'block' : 'hidden'
//             )}
//           >
//             {collapsedId &&
//               collapsedId === categoryName.id &&
//               submenu?.map(({ category, href }, key) => {
//                 return (
//                   <li
//                     key={key}

//                     // className="px-4 py-3 text-sm font-medium text-white transition-colors ease-in hover:bg-blue-700 first-letter:uppercase whitespace-nowrap"
//                   >
//                     {category}
//                   </li>
//                 );
//               })}

//             {/* {submenu && (
//               <li onClick={() => setContent(a + 1)}>{submenu}</li>
//             )} */}
//           </ul>
//         </div>
//       );
//     })}
//     {/* <div className="flex flex-col">
//       <Tab
//         num={2}
//         className={mergeNames(
//           'flex justify-between py-2 font-bold cursor-pointer'
//         )}
//       >
//         Realstate
//         <button onClick={handleExpand}>
//           <AiFillCaretDown />
//         </button>
//       </Tab>
//       <ul
//         className={mergeNames(
//           'cursor-pointer ml-10',
//           expand ? 'block' : 'hidden'
//         )}
//       >
//         {categories?.map(({ categoryName, submenu }, i) => {
//           return (
//             <>

//               <li onClick={() => setContent(a + 1)}>{categoryName}</li>
//             </>
//           );
//         })}
//       </ul>
//     </div> */}
//   </div>
//   <div>
//     {content == 2 && <p>adasd</p>}
//     {content == 3 && <p>adafgdfgsd</p>}
//   </div>
// </div>
{
  /* <div className="w-[20%] text-[#b8cde9] rounded-md bg-mainBlossom">
          <div>
            <button
              className={mergeNames(
                'p-5',
                'border-b border-[#313255]',
                'w-full flex flex-row items-center justify-between'
              )}
            >
              Verify Ads
            </button>
          </div>
          {/* {categories?.map((tab, key) => {
            return (
              <div className="" key={key}>
                <button
                  onClick={() => {
                    setCollapsed((prev) => {
                      if (prev === tab.id) return false;
                      return tab.id;
                    });
                  }}
                  className={mergeNames(
                    'p-5',
                    'border-b border-[#313255]',
                    'w-full flex flex-row items-center justify-between'
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-semibold ">{tab?.name}</p>
                  </div>
                  <CgChevronRight
                    size={20}
                    className={mergeNames(
                      collapsedId === tab?.id && 'rotate-90',
                      'transition-all ease-in-out'
                    )}
                  />
                </button>
                <div
                //  className={mergeNames("sm:px-4 sm:py-4 px-3 py-3")}
                // className="bg-gray-200"
                >
                  {collapsedId === tab.id &&
                    tab?.subCategory?.map((sub, key) => {
                      return (
                        <button
                          key={key}
                          className="w-full py-2 pl-10 border-b border-[#313255] hover:bg-mainBlue"
                          // onClick={() => {
                          //   setContent(categories.submenu.categoryName);
                          // }}
                          onClick={() => {
                            setContent(() => {
                              tab.subCategory;
                            });
                            console.log(tab.subCategory);
                          }}
                        >
                          <p className="text-xs font-medium text-left text-[#b8cde9]">
                            {sub.name}
                          </p>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })} 
        </div> */
}
