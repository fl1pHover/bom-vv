import AdCard from '@/components/home/adCard';
import urls from '@/constants/api';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Checkbox, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MyAds = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const [data, setData] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(`${urls['test']}/ad/many/${num}/true`, user.ads)
        .then((d) => {
          setProducts(d.data);
          setData(d.data);
          // setCategory(d.data.ads.fi)
          let c = [],
            s = [];
          d.data.ads.map((ad) => {
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
          setCategory(c);
          setSubCategory(s);
        })
        .then((a) => setIsLoading(false));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    getData();
  }, [num]);
  useEffect(() => {
    adStatusChecker();
  }, [checker]);
  const brk = 'md:flex-col lg:flex-row sm:flex-row';
  const adStatusChecker = async () => {
    if (checker.pending) {
      let ads = products.ads.filter((p) => p.adStatus == 'pending');
      setProducts({
        ads,
        limit: products.limit,
      });
    } else {
      if (checker.create && products) {
        let ads = products.ads.filter((p) => p.adStatus == 'created');
        setProducts({
          ads,
          limit: products.limit,
        });
      } else await getData();
    }
  };
  const filterCategory = async (cate, value) => {
    await getData();
    if (cate == 'category') {
      let ads = products.ads.filter((ad) => ad.category.name == value);
      setProducts();
    }
  };
  return (
    <>
      <div className={mergeNames('flex flex-col gap-4 mt-5', brk)}>
        <div className="flex w-full gap-4">
          <Select
            className={mergeNames(STYLES.select)}
            placeholder="Бүх төрөл "
            onChange={(e) => {
              if (e.target.value != '') {
                let ads = data.ads.filter(
                  (d) => d.category.name == e.target.value
                );
                setProducts({ ads, limit: data.limit });
              } else {
                setProducts(data);
              }
            }}
          >
            {category?.map((p, i) => {
              return (
                <option value={p} key={i}>
                  {p}
                </option>
              );
            })}
          </Select>
          <Select
            className={mergeNames(STYLES.select)}
            placeholder="Бүх дэд төрөл"
            onChange={(e) => {
              if (e.target.value != '') {
                let ads = data.ads.filter(
                  (d) => d.subCategory.name == e.target.value
                );
                setProducts({ ads, limit: data.limit });
              } else {
                setProducts(data);
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
          </Select>
        </div>
        <div className="flex flex-col justify-end">
          <Checkbox
            colorScheme="green"
            className="font-bold text-green-400 whitespace-nowrap"
            onChange={(e) => {
              setChecker((prev) => ({ ...prev, create: e.target.checked }));
            }}
            isChecked={checker.create}
          >
            Нэмсэн зарууд
          </Checkbox>
          <Checkbox
            className="font-bold text-primary whitespace-nowrap"
            isChecked={checker.pending}
            onChange={(e) => {
              setChecker((prev) => ({ ...prev, pending: e.target.checked }));
            }}
          >
            Хүлээгдэж байгаа
          </Checkbox>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {products?.ads?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}
      </div>
      <ul className="flex float-right list-style-none">
        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (num > 0) {
                let n = num - 1;
                setNum(n);
              }
            }}
          >
            Өмнөх
          </button>
        </li>
        {products?.limit &&
          [...Array(Math.ceil(products.limit / 10)).keys()].map((l) => {
            return (
              <li className={l == num ? 'active mx-1' : 'mx-1'}>
                <button
                  className={mergeNames(
                    l == num ? STYLES.active : STYLES.notActive
                  )}
                  onClick={() => {
                    setNum(l);
                  }}
                >
                  {l + 1}
                </button>
              </li>
            );
          })}

        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (products.limit > 10) {
                let n = num + 1;
                setNum(n);
              }
            }}
          >
            Дараах
          </button>
        </li>
      </ul>
    </>
  );
};

export default MyAds;
