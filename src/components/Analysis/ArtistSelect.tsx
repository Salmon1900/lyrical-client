import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';



export default function ArtistSelect() {
  const [artist, setArtist] = React.useState('');

  const { data: artists, isPending, error } = useQuery({
    queryKey: ['artists'],
    queryFn: async () => ["artist1", 'artist2', 'artist3']
  })

  const handleChange = (event: SelectChangeEvent) => {
    setArtist(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Artist</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={artist}
          label="Artist"
          onChange={handleChange}
        >
          {artists?.map(a => <MenuItem value={a}>{a}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
