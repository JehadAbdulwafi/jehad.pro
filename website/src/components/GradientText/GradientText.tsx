import React from "react";
import PropTypes from "prop-types";
import "./GradientText.css";

type PropTypes = {
  text: string;
  background?: string;
};

const GradientText = ({
  text,
  background = "linear-gradient(137.81deg, #e7a28f 3.52%, #f9d6ac 41.89%, #fbfefc 96.77%)",
}: PropTypes) => {
  return (
    <span className="text" style={{ backgroundImage: background }}>
      {text}
    </span>
  );
};

export default GradientText;
