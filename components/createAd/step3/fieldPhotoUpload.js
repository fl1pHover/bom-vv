/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AtomLabel } from "./atom";
import { FiUploadCloud } from "react-icons/fi";
import { BiX } from "react-icons/bi";

const FieldPhotoUpload = ({
  generalData = {},
  setImages = () => {},
  setGeneralData = () => {},
}) => {
  const hiddenFileInput = React.useRef(null);
  // saving IMAGES locally
  const [selectedImages, setSelectedImages] = React.useState(
    generalData.images || []
  );
  const [isImageSelected, setIsImageSelected] = React.useState(
    generalData?.imgSelected
  );

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    const selectedFilesArray = Array.from(fileUploaded);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => [...previousImages, ...imagesArray]);
    setImages((images) => [...images, fileUploaded[0]]);

    // FOR BUG IN CHROME
    event.target.value = "";
    setIsImageSelected(true);
    setGeneralData((prev) => ({
      ...prev,
      imgSelected: true,
      images: [...prev.images, ...imagesArray],
    }));
  };

  function deleteHandler(image) {
    // IF ALL IMAGES ARE GONE, SETTING STATUS FALSE
    if (selectedImages?.length === 1) {
      setGeneralData((prev) => ({ ...prev, imgSelected: false }));
      setIsImageSelected(false);
    }
    setSelectedImages(selectedImages.filter((e) => e !== image));
    setGeneralData((prev) => ({
      ...prev,
      imgSelected: true,
      images: selectedImages.filter((e) => e !== image),
    }));
    URL.revokeObjectURL(image);
  }

  return (
    <div className="">
      <AtomLabel>Зураг оруулах</AtomLabel>
      <>
        <input
          type="file"
          accept="image/*"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          multiple
          onChange={handleChange}
        />
        {isImageSelected ? (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 w-full h-full overflow-hidden border-2 border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4">
            {selectedImages.map((image, key) => {
              return (
                <div
                  key={key}
                  className="h-[20vh] relative rounded-md flex justify-center items-center"
                >
                  <img
                    src={image}
                    alt="image"
                    className="h-full w-full object-center object-cover bg-gray-300 rounded-md overflow-hidden"
                  />
                  <button
                    onClick={() => deleteHandler(image)}
                    className="absolute -bottom-2 -right-2 text-white bg-gray-500 rounded-full hover:bg-red-500 transition-all"
                  >
                    <BiX size={30} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            onClick={handleClick}
            className="border-2 w-full min-h-[25vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center"
          >
            <FiUploadCloud size={90} className="text-blue-400" />
            <p>Зураг оруулах</p>
          </button>
        )}
        {isImageSelected && (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md mt-4"
            onClick={handleClick}
          >
            Зураг нэмэх
          </button>
        )}
      </>
    </div>
  );
};

export default FieldPhotoUpload;
