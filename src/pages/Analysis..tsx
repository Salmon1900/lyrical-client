import { Button, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Song } from "../types/Song";
import { AnalysisSelectionType } from "../types/Analysis";
import SongsAnalysis from "../components/Analysis/SongsAnaysis";
import AnalysisSelectionSwitch from "../components/Analysis/AnalysisSelectionSwitch";
import SongsMultiSelect from "../components/Analysis/SongsMutiSelect";
import ArtistSelect from "../components/Analysis/ArtistSelect";
import ShowAnalysisButton from "../components/Analysis/ShowAnalysisButton";

const Analysis = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [analysisSelectionType, setAnalysisSelectionType] =
    useState<AnalysisSelectionType>("Songs");
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!showAnalysis ? (
        <div>
          <AnalysisSelectionSwitch
            anaysisSelectionType={analysisSelectionType}
            setAnalysisSelectionType={setAnalysisSelectionType}
          />
          {
            analysisSelectionType === "Songs" ? <SongsMultiSelect songs={songs} setSongs={setSongs}/> : <ArtistSelect/>
          }
          <Button onClick={() => setShowAnalysis(true)} variant="contained">Analyise!</Button>
        </div>
      ) : (
          <div>
            <Button onClick={() => setShowAnalysis(false)} variant="contained">Reset</Button>
            <SongsAnalysis songs={songs} />
        </div>
      )}
    </div>
  );
};

export default Analysis;
