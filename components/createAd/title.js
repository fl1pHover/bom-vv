import React from "react";
import FormLine from "./formLine";

const FormTitle = (props) => {
  return (
    <div>
      <p className="text-4xl text-center font-semibold mb-6">{props.children}</p>
    </div>
  );
};

export default FormTitle;
