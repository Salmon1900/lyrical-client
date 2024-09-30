import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Song } from '../../types/Song';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface ISongMultiSelectProps {
    songs: Song[],
    setSongs: (songs: Song[]) => void
}

export default function SongsMultiSelect({ songs, setSongs }: ISongMultiSelectProps) {
  const [selectedSongNames, setSelectedSongNames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedSong = event.target.value;
    // setSelectedSongNames((prev) => )
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Songs</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedSongNames as any}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Songs" />}
          renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {songs.map((song) => (
            <MenuItem
              key={song.id}
              value={song.id}
            //   style={getStyles(name, personName, theme)}
            >
              {song.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
