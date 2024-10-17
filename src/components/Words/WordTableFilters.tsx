import React, { useState } from "react";
import { WordFilters } from "../../types/Word";
import useGroups from "../../hooks/groups/useGroups";
import useFetchSongs from "../../hooks/songs/useFetchSongs";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { WordGroup } from "../../types/WordGroups";
import { Song } from "../../types/Song";

interface WordTableFiltersProps {
  filters: WordFilters;
  setFilters: (newFilters: WordFilters) => void;
}

const WordTableFilters = ({ filters, setFilters }: WordTableFiltersProps) => {
    const [line, setLine] = useState<string>("");
    const [verse, setVerse] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [selectedGroups, setSelectedGroups] = useState<WordGroup[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

  const { groups } = useGroups();
  const { songs } = useFetchSongs();

  // Handle changes in the Autocomplete fields
  const handleGroupsChange = (
    event: React.SyntheticEvent,
    newValue: any[]
  ) => {
    setSelectedGroups(newValue)
  };

  const handleSongsChange = (
    event: React.SyntheticEvent,
    newValue: any[]
  ) => {
    setSelectedSongs(newValue)
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  };

  const handleVerseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerse(event.target.value)
  };

  const handleLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine(event.target.value)
  };

  const applyFilters = () => {
    setFilters({
        ids: selectedGroups.map(g => g.wordIds).flat(1),
        songIds: selectedSongs.map(s => s.id),
        line: Number.isNaN(Number(line)) || Number(line) == 0 ? undefined : Number(line) - 1,
        verse: Number.isNaN(Number(verse)) || Number(verse) == 0 ? undefined : Number(verse) - 1,
        text: text
    })
  }

  return (
    <Box sx={{ width: 400, mx: "auto", mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={groups}
            getOptionLabel={(option) => option.name}
            onChange={handleGroupsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Groups"
                placeholder="Groups"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={songs || []}
            getOptionLabel={(option) => option.name}
            onChange={handleSongsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Songs"
                placeholder="Songs"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Text"
            value={text}
            onChange={handleTextChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Verse"
            // type="number"
            value={verse}
            onChange={handleVerseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Line"
            // type="number"
            value={line}
            onChange={handleLineChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={applyFilters}>Apply</Button></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export default WordTableFilters;
