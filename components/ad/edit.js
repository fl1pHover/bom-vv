import { LoadingButton } from '@/lib/Button';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import { AspectRatio, Box, Input } from '@chakra-ui/react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Textarea } from 'flowbite-react';
import { ProductInfo } from 'pages/product/[slug]';
import { useMemo, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const EditAd = ({
  isOpen,
  onClose,
  onOpen,
  onNext = () => {},
  data,
  setData,
  admin = false,
}) => {
  const libraries = useMemo(() => ['places'], []);

  const [markerActive, setMarkerActive] = useState(null);
  const [loading, setLoading] = useState(false);
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
      lat: data?.location?.lat ?? 47.9186367,
      lng: data?.location?.lng ?? 106.9164856,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  let dummyData = { ...data };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      btnOpen={<>Засах</>}
      onclick={onNext}
      btnClose={<LoadingButton text="Нэмэх" isLoading={loading} />}
      btnClose2="Буцах"
      header="Баталгаажуулах хэсэг"
    >
      <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
        <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
          {/*Product */}
          {data.title && (
            <Input
              variant={'mediumHeading'}
              onChange={(e) => {
                dummyData.title = e.target.value;
                if (!admin) {
                  setData(dummyData);
                } else {
                  data = dummyData;
                }
              }}
              mb={5}
              value={data.title}
            />
          )}

          {/* product image and information */}
          <div className="flex flex-col ">
            <div>
              <Box
                className={mergeNames(
                  'edit-product__image',
                  'border-2 border-blue-900/20 mb-[120px] shadow-md'
                )}
              >
                {data?.images && (
                  <AspectRatio
                    ratio={1}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <ImageGallery
                      items={data?.images.map((i) => ({
                        original: i,
                        thumbnail: i,
                      }))}
                      className="object-contain"
                    />
                  </AspectRatio>
                )}
              </Box>
              <Textarea
                mt={5}
                onChange={(e) => {
                  dummyData.description = e.target.value;
                  if (!admin) {
                    setEditData(dummy);
                  } else {
                    data = dummyData;
                  }
                }}
              >
                {data.description}
              </Textarea>
            </div>

            {data && (
              <div className="grid grid-cols-2 gap-3">
                <p className="text-xl font-bold col-span-full">
                  Ерөнхий мэдээлэл
                </p>

                {data.filters?.map((p, i) => {
                  return (
                    <ProductInfo
                      key={i}
                      title={p.name}
                      id={p.parent}
                      value={p.input}
                      edit={true}
                      href={false}
                      type={p.type}
                      admin={admin}
                      setEditData={setData}
                      editData={data}
                    />
                  );
                })}
              </div>
            )}

            <GoogleMap
              onClick={(e) => {
                dummyData.location = e.latLng.toJSON();
                if (!admin) {
                  setEditData(dummy);
                } else {
                  data = dummyData;
                }
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
                      lat: parseFloat(data?.location?.lat ?? 47.74604),
                      lng: parseFloat(data?.location?.lng ?? 107.341515),
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
  );
};
export default EditAd;
