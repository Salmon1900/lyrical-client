import React, { useRef, useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import useAddSong from "../../hooks/songs/useAddSong";
import { Word } from "../../types/Word";

const splitLyrics = (lyrics: string): Word[] => {
  const wordList: Word[] = [];
  let totalIndex = 0;

  lyrics.split(/\n\n|\r\n\r\n/).forEach((verse, vIndex) => {
    verse.split(/\n|\r\n/).forEach((line, lIndex) => {
      line.split(" ").forEach((word, wIndex) => {
        wordList.push({
          id: totalIndex,
          name: word.replace(/[^a-zA-Z0-9]/g, ''),
          verse: vIndex,
          line: lIndex,
          lineLocation: wIndex,
          location: totalIndex,
          songId: 1,
        });
        totalIndex++;
      });
    });
  });

  return wordList;
};

const SongForm: React.FC = () => {
  const { addSong, error, isPending } = useAddSong();
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  let fileReader: FileReader;
  const fileInputRef: any = useRef(null);

  const handleFileRead = (ev: ProgressEvent<FileReader>) => {
    const content = fileReader.result;
    setLyrics(content as string);
  };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!songName) newErrors.songName = "Song name is required";
    if (!artist) newErrors.artist = "Artist name is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (!lyrics) newErrors.file = "File is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission
    addSong({
      song: {
        id: 1,
        name: songName,
        genre,
        artist,
      },
      words: splitLyrics(lyrics),
    });

    // Reset the form
    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
    setSongName("");
    setArtist("");
    setGenre("");
    setLyrics("");
    setFile(null);
    setErrors({});
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Song Name"
              variant="outlined"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              error={!!errors.songName}
              helperText={errors.songName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Artist"
              variant="outlined"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              error={!!errors.artist}
              helperText={errors.artist}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genre"
              variant="outlined"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              error={!!errors.genre}
              helperText={errors.genre}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".txt"
              id="fileInput"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  handleFileChosen(e.target.files[0]);
                }
              }}
            />
            {errors.file && (
              <Typography color="error">{errors.file}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Song
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SongForm;
