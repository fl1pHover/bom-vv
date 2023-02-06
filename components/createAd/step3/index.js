import { useState } from "react";
import FormLine from "../formLine";
import FormTitle from "@/components/createAd/title";
import { AtomLabel } from "./atom";
import FieldPriceArea from "./fieldPriceArea";
import FieldTitle from "./fieldTitle";
import FieldPhotoUpload from "./fieldPhotoUpload";

// FILTER DATA: PRICE, AREA, UNITPRICE
// TITLE, DESCRIPTION, IMAGE UPLOAD
const Step3 = ({
  filter = [],
  images = [],
  generalData = {},
  setImages = () => {},
  setGeneralData = () => {},
}) => {
  return (
    <>
      <FormTitle>Ерөнхий мэдээлэл</FormTitle>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 lg:px-20 sm:px-10 px-4">
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 md:px-0 md:gap-10 gap-6 md:mb-16 mb-8">
          <FieldPriceArea
            generalData={generalData}
            setGeneralData={setGeneralData}
          />
        </div>
        <FormLine />

        <div className="flex md:flex-row flex-col gap-8 mb-10 md:px-0 md:mt-16 mt-8">
          <div className="flex-1 space-y-8 ">
            <FieldTitle
              generalData={generalData}
              setGeneralData={setGeneralData}
            />
            <div className="md:block hidden">
              <FieldPhotoUpload
                images={images}
                setImages={setImages}
                generalData={generalData}
                setGeneralData={setGeneralData}
              />
            </div>
          </div>
          <div className="flex-1 pb-2">
            <AtomLabel>Дэлгэрэнгүй</AtomLabel>
            <textarea
              cols={30}
              rows={13}
              placeholder="Дэлгэрэнгүй"
              value={generalData?.desc || ""}
              onChange={
                (e) =>
                  setGeneralData((prev) => ({ ...prev, desc: e.target.value }))
                // setGeneralData((prev) => ({ ...prev, desc: e.target.value }))
              }
              className="w-full rounded-2xl border-2 border-blue-400/60 px-4 ring-blue-400"
            />
          </div>
          <div className="md:hidden block">
            <FieldPhotoUpload
              setImages={setImages}
              generalData={generalData}
              setGeneralData={setGeneralData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
/* <div className="flex flex-col items-center gap-4 md:flex-row justify-evenly">
        <div>
          <LilFormLabel title="Төлбөрийн нөхцөл" />
          <div className="flex justify-center gap-4">
            {['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'].map(
              (item, key) => {
                const isSelected = item === payment;
                return (
                  <ButtonSelectItem
                    key={key}
                    text={item}
                    isSelected={isSelected}
                    onClick={() => setPayment(item)}
                  />
                );
              }
            )}
          </div>
        </div>
        <div>
          <LilFormLabel title="Бартер" />
          <div className="flex justify-center gap-4">
            {['Байгаа', 'Байхгүй'].map((item, key) => {
              const isSelected = item === payment;
              return (
                <ButtonSelectItem
                  key={key}
                  text={item}
                  isSelected={isSelected}
                  onClick={() => setPayment(item)}
                />
              );
            })}
          </div>
        </div>
      </div> */
