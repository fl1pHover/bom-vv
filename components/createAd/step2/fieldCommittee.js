import React from "react";
import FormLabel from "../formLabel";
import Input, { NumberInput } from "@/lib/Input";
import { InputContainer } from "./inputContainer";

const FieldCommittee = ({
  district = "",
  onClick = () => {},
  committee = "",
}) => {
  if (district === "Орон нутаг")
    return (
      <InputContainer>
        <FormLabel title="Сум" />
        <Input ph="Сум" value={committee} onChange={(val) => onClick(val)} />
      </InputContainer>
    );
  return (
    <InputContainer>
      <FormLabel title="Хороо" />
      <NumberInput
        ph="Хороо"
        value={committee}
        onChange={(val) => onClick(val)}
      />
      <p className="">Заавал тоо оруулна уу</p>
    </InputContainer>
  );
};

export default FieldCommittee;
