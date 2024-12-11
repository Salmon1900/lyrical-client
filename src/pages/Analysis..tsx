import { Button, MenuItem, Select } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Song, SongExpanded } from "../types/Song";
import { AnalysisSelectionType, AnalyzedSong } from "../types/Analysis";
import SongsAnalysis from "../components/Analysis/SongsAnaysis";
import AnalysisSelectionSwitch from "../components/Analysis/AnalysisSelectionSwitch";
import SongsMultiSelect from "../components/Analysis/SongsMutiSelect";
import ArtistSelect from "../components/Analysis/ArtistSelect";
import ShowAnalysisButton from "../components/Analysis/ShowAnalysisButton";
import { useQuery } from "@tanstack/react-query";
import { getSongsStats } from "../api/anaysis";
import { findAlliterations, findMetaphors, findRepetitions, findRhymesPairs, findSimiles } from "../components/Analysis/literaryUtils";

const Analysis = () => {
  const [selectedSongs, setSelectedSongs] = useState<SongExpanded[]>([]);
  const [analyzedSongs, setAnalyzedSongs] = useState<AnalyzedSong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisSelectionType, setAnalysisSelectionType] =
    useState<AnalysisSelectionType>("Songs");
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => { setSelectedSongs([])}, [analysisSelectionType])

  const handleAnalyize = async () => {
    setLoading(true);
    const statsRes = await getSongsStats(selectedSongs.map(s => s.id));
    findRhymesPairs(selectedSongs[0].words)
    setAnalyzedSongs(selectedSongs.map((s, i) => ({
      ...s,
      stats: statsRes.data[i],
      devices: {
        rhymes: findRhymesPairs(s.words),
        repetitions: findRepetitions(s.words),
        alliterations: findAlliterations(s.words),
        metaphores: findMetaphors(s.words),
        similies: findSimiles(s.words)
      }
    })))

    setTimeout(() => setShowAnalysis(true), 100)
  }

  // const { data: stats, refetch: getSongStats} = useQuery({
  //   initialData: [],
  //   queryKey: ['stats', selectedSongs.map(s => s.id).join(',')],
  //   queryFn: async () => { 
  //     const statsRes = await getSongsStats(selectedSongs.map(s => s.id))
  //     return statsRes.data || []
  //   },
  //   enabled: false,
  // })


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
          <Button onClick={() => handleAnalyize()} variant="contained" fullWidth style={{ marginTop: 20}}>
            Analyise!
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center'}}>
          <Button onClick={() => setShowAnalysis(false)} variant="contained">
            Reset
          </Button>
          <SongsAnalysis songs={analyzedSongs} />
        </div>
      )}
    </div>
  );
};

export default Analysis;
