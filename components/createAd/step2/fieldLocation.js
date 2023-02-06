import React from "react";
import Select from "@/lib/Select";
import FormLabel from "../formLabel";
import FormLine from "../formLine";

const FieldLocation = ({
  locationData,
  selectedLocalData,
  setPositions = () => {},
  handleNamedata = () => {},
}) => {
  // TODOs: END BAIRSHIL IIN DATA DEER BUSAD GESEN UTGA BAIHGUI BAIGAA
  // BUSAD GESEN UTGIIG SONGOHOOR INPUT GARJ IREH YSTOI
  // TER INPUT DEER HEREGLEGCH UURIINHUU UGTIIG TEXT HUVILBARAAR ORUULAH YSTOI

  return (
    <>
      <div className="mt-4 mb-10">
        <FormLabel title="Байршил" num={4} />
        <Select
          data={locationData}
          label={selectedLocalData?.location || "Байршил"}
          Item={({ data, onClick, ...props }) => {
            return (
              <button
                {...props}
                onClick={() => {
                  onClick();
                  setPositions((prev) => ({
                    ...prev,
                    location_id: data?._id,
                    committee_id: false,
                    town_id: false,
                  }));
                  handleNamedata("location", data?.name);
                }}
              >
                <p>{data?.name}</p>
                {props.children}
              </button>
            );
          }}
        />
      </div>
      <FormLine />
    </>
  );
};

export default FieldLocation;
