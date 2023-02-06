import React from "react";
import CheckItem from "./checkItem";
import Line from "@/components/createAd/formLine";
import FormLabel from "@/components/createAd/formLabel";
import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";

import { SellTypes } from "@/constants/enums";

const FieldSellType = ({ types = {}, setTypes = () => {} }) => {
  return (
    <>
      <FormLabel num={2} title="Борлуулах төрөл" />
      <div className="flex flex-row justify-center gap-4 mt-2">
        {Object.keys(SellTypes).map((type, key) => {
          const isSelected = type === types?.sellType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={SellTypes[type].name}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  sellType: type,
                }))
              }
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
      <Line />
    </>
  );
};

export default FieldSellType;
