import React from "react";
import CategoryButtonSelect from "@/components/createAd/categoryButtonSelect";
import Line from "@/components/createAd/formLine";

const FieldCategory = ({
  types = {},
  categories = [],
  setTypes = () => {},
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-6 grid-cols-3 py-4 lg:gap-4 gap-4 auto-rows-fr md:w-4/5 w-full">
          {categories?.map((item, key) => {
            const isSelected = key.toString() === types.categoryId.toString();
            return (
              <CategoryButtonSelect
                key={key}
                item={item}
                isSelected={isSelected}
                onClick={() => {
                  setTypes((prev) => ({
                    ...prev,
                    categoryId: key,
                    categoryName: item?.href,
                    subCategoryId: false,
                  }));
                }}
              />
            );
          })}
        </div>
      </div>
      <Line />
    </>
  );
};

export default FieldCategory;
