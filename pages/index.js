import AdContent from '@/components/home/adContent';
import CategorySelect from '@/components/home/categorySelect';
import SwiperHeader from '@/components/home/swiperHeader';
import urls from '@/constants/api';

import { useAuth } from '@/context/auth';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

// import required modules

export default function Home({ propAds }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAds, ads } = useAuth();
  const libraries = useMemo(() => ['places'], []);
  // const { categories, setAds } = useAuth();
  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: parseFloat(propAds[0]?.location?.lat) ?? 104.993857,
      lng: parseFloat(propAds[0]?.location?.lng) ?? 46.022469,
    }),
    []
  );
  useEffect(() => {
    setIsLoading(true);
    if (typeof propAds === 'object' && propAds?.ads) {
      setAds(propAds);
      setMarkerActive(0);
    }

    setIsLoading(false);
  }, [propAds]);
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <SwiperHeader />
      <CategorySelect />
      {/* {categories?.map((c, i) => {
        let ad = propAds?.filter((a) => a.category == c._id);
        if (ad?.length > 0)
          return (
            <AdContent data={ad} key={i} tlc={toLowerCase} title={c.name} />
          );
      })} */}
      <div className="px-4 xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6">
        {ads && <AdContent data={ads} showLink="" />}
      </div>
    </>
  );
}
{
  /* {markerActive === i ? (
    <InfoWindow onCloseClick={() => setMarkerActive(null)}>
      <div>{m.title}</div>
    </InfoWindow>
  ) : null} */
}

export async function getServerSideProps({ params, query }) {
  try {
    const res = await fetch(`${urls['test']}/ad/${0}`);
    const ads = await res.json();
    return {
      props: { propAds: ads },
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
