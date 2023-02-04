import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Heading, Image, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdCompareArrows } from 'react-icons/md';
import AdContent from '../../components/home/adContent';

const CompareItem = () => {
  return (
    <div className="w-full h-full bg-white max-w-[250px] relative ">
      <Image src="" alt="compare ads image" />

      {/* Delete button*/}
      <div className="absolute delete -top-[10px] -right-[10px] rounded-full" />
    </div>
  );
};

const CompareSelect = () => {
  const router = useRouter();
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={mergeNames(
        'fixed px-[10%] bottom-0 left-0',
        'bg-secondary/90 w-screen transition-all ease-in-out pb-[68px] md:pb-0',
        ' text-[12px] sm:text-base',
        expand ? 'h-[250px]' : 'h-0'
      )}
    >
      <button
        className="h-[50px] gap-2 px-5 bg-secondary/90 absolute -top-[65px] rounded-2xl left-[15px] flex place-items-center text-white"
        onClick={() => setExpand(!expand)}
      >
        <MdCompareArrows
          className={mergeNames('text-xl ', expand ? 'rotate-0' : 'rotate-180')}
        />
        <p className="text-[12px]">Харьцуулах</p>
      </button>
      <div className={mergeNames(STYLES.flexBetween, 'pt-5 text-white w-full')}>
        <p>
          Харьцуулах ( <span> 4</span>/4 )
        </p>
        <div className="flex gap-2 transition-all ease-in-out">
          <button>Цэвэрлэх</button>
          <button
            onClick={() => router.push('/bookmark')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-2xl"
          >
            Харьцуулах
          </button>
        </div>
      </div>
      <div className="grid h-[80%] grid-cols-4 md:gap-6 gap-1 py-5">
        {/* Compare item */}
        <CompareItem />
      </div>
    </div>
  );
};

const MyAds = () => {
  const [products, setProducts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setIsLoading(true);
    try {
      await fetch('https://bom-location.herokuapp.com/ad')
        .then((r) => r.json())
        .then((d) => setProducts(d))
        .then((a) => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CompareSelect />
      <Heading variant={'mediumHeading'}>
        <AdContent data={products} tlc={toLowerCase} title=" " />
      </Heading>

      <Stack display={{ base: 'flex', md: 'none' }}>
        <AdContent data={products} tlc={toLowerCase} title=" " />
      </Stack>
    </>
  );
};

export default MyAds;