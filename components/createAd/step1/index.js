import React from "react";
import { categories as localCategory } from "@/data/categories";

import Title from "@/components/createAd/title";
import FormLabel from "@/components/createAd/formLabel";

import FieldCategory from "./fieldCategory";
import FieldSubCategory from "./fieldSubCategory";
import FieldSellType from "./fieldSellType";
import FieldAdType from "./fieldAdType";

const Step1 = ({
  types = {},
  setTypes = () => {},
  categories = localCategory,
}) => {
  return (
    <>
      <Title>Төрөл</Title>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
        <>
          {/* CATEGORY */}
          <FormLabel num="1" title="Таны зарах хөрөнгийн төрөл?" />
          <FieldCategory {...{ types, categories, setTypes }} />
        </>

        {types?.categoryName && (
          // SUBCATEGORY
          <>
            <FormLabel title="Дэд төрөл" />
            <FieldSubCategory {...{ localCategory, types, setTypes }} />
          </>
        )}

        {types.subCategoryId && (
          // ZARAH TURUL BOLON ZARIIN TURUL
          // ZARAH TURUL: SELL OR RENT
          // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
          <>
            <FieldSellType {...{ types, setTypes }} />
            <FieldAdType {...{ types, setTypes }} />
          </>
        )}
      </div>
    </>
  );
};

export default Step1;
