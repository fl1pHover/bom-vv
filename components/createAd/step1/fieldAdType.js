import React from "react";
import CheckItem from "./checkItem";
import Line from "@/components/createAd/formLine";
import FormLabel from "@/components/createAd/formLabel";
import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";

import { AdTypes } from "@/constants/enums";

const FieldAdType = ({ types = {}, setTypes = () => {} }) => {
  return (
    <>
      <FormLabel title="Зарын төрөл" />
      <div className="flex flex-row justify-center gap-4 mt-2">
        {Object.keys(AdTypes).map((type, key) => {
          const isSelected = type === types?.adType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={AdTypes[type].name}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  adType: type,
                }))
              }
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
    </>
  );
};

export default FieldAdType;
