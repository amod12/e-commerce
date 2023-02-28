import React from "react";
import "../App.css";
export const CustomButton = (props) => {
  return (
    <div>
      <button className="button" type="{props.type}" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};
