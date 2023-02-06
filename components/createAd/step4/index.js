import Counter from "@/lib/Counter";
import { DateYearSelector } from "@/lib/DateSelector";
import Select from "@/lib/Select";
import mergeNames from "@/util/mergeNames";
import { useState } from "react";
import ButtonSelectItem from "../formButtonSelectItem";
import FormLabel from "../formLabel";
import FormLine from "../formLine";

const Step3 = ({ filter }) => {
  const [roomNumber, setRoomNumber] = useState(false);
  const [bedRoomNumber, setBedRoomNumber] = useState(false);
  const [bathroomNumber, setBathroomNumber] = useState(false);
  const [usedYear, setUsedYear] = useState(false);
  const [building, setBuilding] = useState({ allFloor: false, floor: false });
  // const [filters, setFilters] = useState(filter)

  return (
    <div className="w-full grid md:grid-cols-2 ">
      {filter?.map((f, i) => {
        // console.log(f.id)
        // console.table(f);
        if (f.mark == "year")
          return (
            <ItemContainer>
              <FormLabel title={f.name} />
              <DateYearSelector
                defValue={usedYear}
                placeholder={f.name}
                onSelect={(num) => (f.value = num)}
              />
            </ItemContainer>
          );
        if (f.id === "room")
          return (
            <ItemContainer
              className={"flex flex-col items-center justify-center"}
            >
              <FormLabel title="Өрөөний тоо" />
              <Counter
                limit={5}
                maxValue="5+"
                setValue={(val) => setRoomNumber(val)}
              />
            </ItemContainer>
          );

        if (f.id === "bathroom")
          return (
            <ItemContainer>
              <FormLabel title="Угаалгын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {["1", "2", "3+"].map((text, id) => {
                  const isSelected = text === bathroomNumber;
                  return (
                    <ButtonSelectItem
                      key={id}
                      text={text}
                      isSelected={isSelected}
                      onClick={() => setBathroomNumber(text)}
                    />
                  );
                })}
              </div>
              {/* <Counter
            limit={3}
            maxValue="3+"
            setValue={(val) => setRoomNumber(val)}
          /> */}
            </ItemContainer>
          );
        if (f.id === "masterBedroom")
          return (
            <ItemContainer>
              <FormLabel title="Мастер унтлагын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {["Байхгүй", "1", "2", "2+"].map((text, id) => {
                  const isSelected = text === bedRoomNumber;
                  return (
                    <ButtonSelectItem
                      text={text}
                      key={id}
                      isSelected={isSelected}
                      onClick={() => setBedRoomNumber(text)}
                    />
                  );
                })}
              </div>
            </ItemContainer>
          );
        if (f.type == "dropdown")
          return (
            <ItemContainer
            //  className="bg-red-100"
            >
              <FormLabel title={f.name} />
              <Select
                width="long"
                data={f.values}
                label={f.value != "" ? f.value : f.name}
                Item={({ data, onClick, id, ...props }) => {
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        console.log(f.value);
                        console.log(f);
                        onClick();
                        f.value = data;
                      }}
                    >
                      {id + 1}
                      {props.children}
                    </button>
                  );
                }}
              />
            </ItemContainer>
          );
      })}
    </div>
  );
};

const Row = (props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 my-8 md:grid-cols-2">
      {props.children}
    </div>
  );
};

const Col = (props) => (
  <div className="flex flex-col items-center">{props.children}</div>
);

const ItemContainer = ({ children, className }) => (
  <div className={mergeNames("mb-10", className)}>{children}</div>
);

export default Step3;
