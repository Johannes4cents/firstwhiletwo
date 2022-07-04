import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value, valuetexts) {
  if (!valuetexts) return `${value}`;
  else return valuetexts[value];
}

export default function DiscreteSlider({
  min,
  max,
  step,
  value,
  onChange,
  width = 300,
  valueTexts,
  label,
}) {
  return (
    <Box sx={{ width: width }}>
      <Slider
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        getAriaValueText={(e) => valuetext(value, valueTexts)}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
      />
    </Box>
  );
}
