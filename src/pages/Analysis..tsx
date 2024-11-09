import { Button, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Song } from "../types/Song";
import { AnalysisSelectionType } from "../types/Analysis";
import SongsAnalysis from "../components/Analysis/SongsAnaysis";
import AnalysisSelectionSwitch from "../components/Analysis/AnalysisSelectionSwitch";
import SongsMultiSelect from "../components/Analysis/SongsMutiSelect";
import ArtistSelect from "../components/Analysis/ArtistSelect";
import ShowAnalysisButton from "../components/Analysis/ShowAnalysisButton";

const Analysis = () => {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [analysisSelectionType, setAnalysisSelectionType] =
    useState<AnalysisSelectionType>("Songs");
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => { setSelectedSongs([])}, [analysisSelectionType])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!showAnalysis ? (
        <div style={{ width: '30vw', marginTop: '37vh'}}>
          <AnalysisSelectionSwitch
            anaysisSelectionType={analysisSelectionType}
            setAnalysisSelectionType={setAnalysisSelectionType}
          />
          {analysisSelectionType === "Songs" ? (
            <SongsMultiSelect
              selectedSongs={selectedSongs}
              setSelectedSongs={setSelectedSongs}
            />
          ) : (
            <ArtistSelect
              selectedSongs={selectedSongs}
              setSelectedSongs={setSelectedSongs}
            />
          )}
          <Button onClick={() => setShowAnalysis(true)} variant="contained" fullWidth style={{ marginTop: 20}}>
            Analyise!
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center'}}>
          <Button onClick={() => setShowAnalysis(false)} variant="contained">
            Reset
          </Button>
          <SongsAnalysis songs={selectedSongs} />
        </div>
      )}
    </div>
  );
};

export default Analysis;
