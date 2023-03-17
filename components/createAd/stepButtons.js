import { LoadingButton } from '@/lib/Button';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import {
  AspectRatio,
  Box,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { ProductInfo } from 'pages/product/[slug]';
import { useMemo } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ImageGallery from 'react-image-gallery';
const ButtonProcess = () => {
  return (
    <div className="relative w-full h-5 overflow-hidden bg-emerald-700/30 rounded-xl">
      <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 h-5 w-[10vw]" />
      <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
        10%
      </p>
    </div>
  );
};

const StepButtons = ({
  onPrev = () => {},
  loading = false,
  onNext = () => {},
  data,
  generalData,
  txt = 'Дараах',
  onClick = () => {},
  step,
  setStep,
  map,
  selectedParent,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const libraries = useMemo(() => ['places'], []);
  // const { categories, setAds } = useAuth();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      
      lat: parseFloat(map?.lat ?? 47.91887307876936),
      lng: parseFloat(map?.lng ?? 106.91757202148438),
    }),
    []
  );
  return (
    <div className="mt-4">
      {/* <ButtonProcess /> */}
      <div className="flex flex-row justify-between pt-2">
        <button
          onClick={onPrev}
          className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-red-400 rounded-full"
        >
          <FiArrowLeft size={20} />
          Буцах
        </button>

        {step == 2 ? (
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            btnOpen={
              <>
                Илгээх <FiArrowRight size={20} />
              </>
            }
            onclick={onNext}
            btnClose={<LoadingButton text="Нэмэх" isLoading={loading} />}
            btnClose2="Буцах"
            header="Баталгаажуулах хэсэг"
          >
            <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
              <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
                {/*Product */}
                {generalData.title && (
                  <Heading
                    variant={'mediumHeading'}
                    mb={5}
                    onClick={() => {
                      onClose(), setStep(1);
                    }}
                  >
                    {generalData.title}
                  </Heading>
                )}

                {/* product image and information */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 product__content-wrapper">
                  <div>
                    <Box
                      className={mergeNames(
                        'product__image',
                        'border-2 border-blue-900/20 mb-[120px] shadow-md'
                      )}
                    >
                      {generalData?.images ? (
                        <AspectRatio
                          ratio={1}
                          onClick={() => {
                            onClose(), setStep(1);
                          }}
                        >
                          <ImageGallery
                            items={generalData?.images.map((i) => ({
                              original: i,
                              thumbnail: i,
                            }))}
                            className="object-contain"
                          />
                        </AspectRatio>
                      ) : (
                        // ene er ustgagdah ulaan shuu
                        <div className="w-full bg-red-500 aspect-square" />
                      )}
                    </Box>
                    <Text
                      mt={5}
                      onClick={() => {
                        onClose(), setStep(1);
                      }}
                    >
                      {generalData.desc}
                    </Text>
                  </div>

                  {data && (
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-bold col-span-full">
                        Ерөнхий мэдээлэл
                      </p>
                      <ProductInfo
                        title={'Үнэ'}
                        id={generalData.price ?? ''}
                        value={generalData.price ?? ''}
                        func={() => {
                          onClose(), setStep(1);
                        }}
                        href={false}
                      />
                      <ProductInfo
                        title={'Нэгж талбайн үнэ'}
                        id={generalData.unitPrice ?? ''}
                        value={generalData.unitPrice ?? ''}
                        func={() => {
                          onClose(), setStep(1);
                        }}
                        href={false}
                      />
                      <ProductInfo
                        title={'Талбай'}
                        id={generalData.area ?? ''}
                        value={generalData.area ?? ''}
                        func={() => {
                          onClose(), setStep(1);
                        }}
                        href={false}
                      />
                      <ProductInfo
                        title={'Утас'}
                        id={generalData.phone ?? ''}
                        value={generalData.phone ?? ''}
                        func={() => {
                          onClose(), setStep(1);
                        }}
                        href={false}
                      />
                      {data?.map((p, i) => {
                        return (
                          <ProductInfo
                            key={i}
                            title={p.name ?? ''}
                            id={p.parent ?? ''}
                            value={p.input ?? ''}
                            func={() => {
                              onClose(), setStep(2);
                            }}
                            href={false}
                          />
                        );
                      })}
                    </div>
                  )}
                  {/* <StepProgress /> */}
                  <GoogleMap
                    onClick={() => {
                      onClose(), setStep(0);
                    }}
                    options={mapOptions}
                    zoom={14}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '100%', height: '50vh' }}
                  >
                    {isLoaded && (
                      <div>
                        <MarkerF
                          position={{
                            lat: parseFloat(map?.lat ?? 47.74604),
                            lng: parseFloat(map?.lng ?? 107.341515),
                          }}
                          animation={google.maps.Animation.DROP}
                          className={mergeNames('group')}
                        />
                      </div>
                    )}
                  </GoogleMap>
                </div>
              </Box>
            </Box>
          </CustomModal>
        ) : (
          <button
            disabled={loading}
            onClick={onNext}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full a"
          >
            {txt}
            <FiArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;
