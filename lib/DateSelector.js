import mergeNames from "@/util/mergeNames";
import React, { useState } from "react";
import { IoCalendarClearSharp } from "react-icons/io5";
mergeNames;
const DateSelector = () => {
  return <div>DateSelector</div>;
};

export default DateSelector;

export const DateYearSelector = ({
  placeholder = "YYYY",
  onSelect = () => {},
  defValue = "",
}) => {
  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(defValue);
  return (
    <div className="relative w-full flex justify-center ">
      <div className=" border-2 overflow-hidden border-blue-500 rounded-full md:w-2/3  flex flex-row justify-between">
        <p className="font-medium px-8 py-2">{selectedYear || placeholder}</p>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="h-full px-4 bg-blue-500 flex justify-center items-center"
        >
          <IoCalendarClearSharp size={20} className="text-white" />
        </button>
      </div>
      {show && (
        <div
          className={mergeNames(
            "z-[50] absolute h-[40vh] bottom-12 overflow-y-scroll rounded-md overflow-hidden flex flex-col md:w-2/3 w-full border bg-white"
          )}
        >
          <div className="grid grid-cols-4">
            {Array(100)
              .fill()
              .map((i, key) => {
                const year = new Date().getFullYear() - key;
                return (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      onSelect(year);
                      setShow(false);
                    }}
                    className="py-2 text-center transition-all ease-linear hover:bg-blue-500 rounded-full font-medium hover:text-white"
                  >
                    {year}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
