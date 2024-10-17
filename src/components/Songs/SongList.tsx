import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { Song } from "../../types/Song";
import useFetchSongs from "../../hooks/songs/useFetchSongs";
import { DeleteForever } from "@mui/icons-material";
import useDeleteSong from "../../hooks/songs/useDeleteSong";

const songs: Song[] = [
  { id: 1, name: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
  { id: 2, name: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: 3, name: "Levitating", artist: "Dua Lipa", genre: "Pop" },
  { id: 4, name: "Peaches", artist: "Justin Bieber", genre: "Pop" },
  {
    id: 5,
    name: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    genre: "Pop",
  },
  { id: 11, name: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
  { id: 12, name: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: 13, name: "Levitating", artist: "Dua Lipa", genre: "Pop" },
  { id: 14, name: "Peaches", artist: "Justin Bieber", genre: "Pop" },
  {
    id: 15,
    name: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    genre: "Pop",
  },
  { id: 21, name: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
  { id: 22, name: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: 23, name: "Levitating", artist: "Dua Lipa", genre: "Pop" },
  { id: 24, name: "Peaches", artist: "Justin Bieber", genre: "Pop" },
  {
    id: 25,
    name: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    genre: "Pop",
  },
  { id: 31, name: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
  { id: 32, name: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: 33, name: "Levitating", artist: "Dua Lipa", genre: "Pop" },
  { id: 34, name: "Peaches", artist: "Justin Bieber", genre: "Pop" },
  {
    id: 35,
    name: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    genre: "Pop",
  },
];

const SongList = () => {
  const { isPending: songsLoading, error, songs } = useFetchSongs();
  const { deleteSong, isPending: deleteLoading } = useDeleteSong();
  return (
    <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <List>
        {(songs || []).map((song) => (
          <div key={song.id}>
            <ListItem>
              <ListItemText primary={song.name} secondary={song.artist} />
              {deleteLoading ? (
                <p>...</p>
              ) : (
                <IconButton onClick={() => deleteSong(song.id)}>
                  <DeleteForever />
                </IconButton>
              )}
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default SongList;
