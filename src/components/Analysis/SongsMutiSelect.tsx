import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Song, SongExpanded } from '../../types/Song';
import useFetchSongs from '../../hooks/songs/useFetchSongs';
import { Autocomplete, TextField } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ISongMultiSelectProps {
    selectedSongs: SongExpanded[],
    setSelectedSongs: (songs: SongExpanded[]) => void
}

export default function SongsMultiSelect({ selectedSongs, setSelectedSongs}: ISongMultiSelectProps) {
  const { songs } = useFetchSongs();


  const handleSongsChange = (
    event: React.SyntheticEvent,
    newValue: any[]
  ) => {
    setSelectedSongs(newValue)
  };

  return (
    <Autocomplete
            multiple
            fullWidth
            options={(songs || []).filter(s => !selectedSongs.includes(s))}
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
  );
}
