import React from "react";

export const AtomLabel = (props) => (
  <div className="flex flex-row">
    <p className="text-base font-medium text-gray-800 md:text-xl indent-2 pb-2">
      {props.children}
    </p>
    <p className="pl-1 text-pink-600">*</p>
  </div>
);
export const AtomPriceText = (props) => (
  <p className="text-2xl font-semibold">{props.children}</p>
);
