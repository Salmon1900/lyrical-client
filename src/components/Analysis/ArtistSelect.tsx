import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';
import useFetchSongs from '../../hooks/songs/useFetchSongs';
import { Song, SongExpanded } from '../../types/Song';

interface IArtistSelectProps {
  selectedSongs: SongExpanded[],
  setSelectedSongs: (songs: SongExpanded[]) => void
}

export default function ArtistSelect({ selectedSongs, setSelectedSongs}: IArtistSelectProps) {
  const [artist, setArtist] = React.useState('');
  const { songs } = useFetchSongs();

  const artists = React.useMemo(() => {
    const artistList = (songs || []).map(s => s.artist);

    // return artistList
    return Array.from(new Set(artistList))
  }, [songs])

  React.useEffect(() => {
    if(artist && songs){
      setSelectedSongs(songs.filter(s => s.artist === artist))
    }
  }, [artist, songs, setSelectedSongs])

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
