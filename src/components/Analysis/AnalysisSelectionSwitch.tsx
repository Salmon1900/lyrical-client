import React, { useState } from "react";
import { Song } from "../../types/Song";
import { AnalysisSelectionType } from "../../types/Analysis";
import { FormControlLabel, Switch } from "@mui/material";

interface IAnalysisSelectionSwitchProps {
  anaysisSelectionType: AnalysisSelectionType;
  setAnalysisSelectionType: (selectionType: AnalysisSelectionType) => void;
}

const AnalysisSelectionSwitch = ({
  anaysisSelectionType,
  setAnalysisSelectionType,
}: IAnalysisSelectionSwitchProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FormControlLabel
        control={
          <Switch
            checked={anaysisSelectionType === "Artist"}
            onChange={() =>
              setAnalysisSelectionType(
                anaysisSelectionType === "Artist" ? "Songs" : "Artist"
              )
            }
            color="primary" // You can change this to "secondary" or any custom color
          />
        }
        label={"Select By " + anaysisSelectionType}
        labelPlacement="start"
      />
    </div>
  );
};

export default AnalysisSelectionSwitch;
