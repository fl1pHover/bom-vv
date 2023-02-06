import React, { useState } from "react";
import FormTitle from "@/components/createAd/title";
import FormLine from "../formLine";

import FieldCommittee from "./fieldCommittee"; // KHOROO AND SUM
import FieldDistrict from "./fieldDistrict";
import FieldLocation from "./fieldLocation";
import FieldTown from "./fieldTown";

const Step2 = ({
  types,
  districts = [],
  locations = [],
  positions = {},
  setPositions = () => {},
  positionNames = {},
  setPositionNames = () => {},
}) => {
  // SAVING LOCAL NAMES -> AUTOSAVING INFORMARION LOCALLY
  const [selectedLocalData, setSelectedLocalData] = useState({
    district: positionNames?.district ?? false,
    location: positionNames?.location ?? false,
    committee: positionNames?.committee ?? false,
    town: positionNames?.town ?? false,
  });

  const locationData = React.useMemo(
    () => {
      return (
        locations?.filter((item) => {
          return positions?.district_id == item.district_id;
        }) || []
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [positions?.district_id]
  );

  const handleNamedata = (name, value) => {
    setPositionNames((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKhorooSum = (val) => {
    // console.log("val", val);
    setPositions((prev) => ({
      ...prev,
      committee_id: val,
    }));
    handleNamedata("committee", val);
  };

  // BUSAD GSN DATA HURJ IREHGUI BN: LOCATION DEER
  // BUSAD IIG SONGOVOL INPUT GARJ IRNE GJ YRIJ BSN
  return (
    <>
      <FormTitle>Байршил</FormTitle>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
        {/* DISTRICT CUSTOM SELECTION */}
        <FieldDistrict
          {...{ selectedLocalData, districts, setPositions, handleNamedata }}
        />

        {/* LOCATION - BAIRSHIL */}
        {selectedLocalData.district && (
          <FieldLocation
            {...{
              locationData,
              setPositions,
              handleNamedata,
              selectedLocalData,
            }}
          />
        )}

        {/* KHOROO SUM(COMMITTEE) and HOTHON TOWN*/}
        {selectedLocalData.location && (
          <div className="flex flex-col gap-8 md:flex-row md:justify-evenly md:gap-4">
            <FieldCommittee
              committee={selectedLocalData?.committee}
              district={selectedLocalData?.district}
              onClick={(val) => handleKhorooSum(val)}
            />

            {types?.subCategoryId !== "land" &&
              types?.subCategoryId !== "office" && (
                <FieldTown
                  {...{ selectedLocalData, handleNamedata, setPositions }}
                />
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Step2;
