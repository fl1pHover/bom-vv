import React from "react";
import FormLabel from "../formLabel";
import FormLine from "../formLine";
import ButtonSelectItem from "../formButtonSelectItem";

const FieldDistrict = ({
  selectedLocalData = {},
  districts = [],
  setPositions = () => {},
  handleNamedata = () => {},
}) => {
  return (
    <>
      <FormLabel title="Дүүрэг / Орон нутаг" num={3} />
      <div className="flex flex-wrap justify-center gap-2 md:space-x-4 md:gap-0">
        {districts?.map((item, key) => {
          return (
            <ButtonSelectItem
              key={key}
              text={item?.name}
              isSelected={selectedLocalData?.district === item?.name}
              onClick={() => {
                setPositions(() => ({
                  district_id: item?._id,
                  location_id: false,
                  committee_id: false,
                  town_id: false,
                }));
                handleNamedata("district", item?.name);
              }}
            />
          );
        })}
      </div>
      <FormLine />
    </>
  );
};

export default FieldDistrict;
