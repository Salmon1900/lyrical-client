import React from 'react';
import { Card, CardContent, Typography, Box, styled } from '@mui/material';
import { Song } from '../../types/Song';

const SongCard = styled(Card)(({ theme }) => ({
//   maxWidth: 400,
  width: 400,
  margin: '20px 20px 10px 10px',
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  marginBottom: theme.spacing(1),
}));

interface ISongAveragesCardProps {
    song: Song
}

const SongAveragesCard = ({ song }: ISongAveragesCardProps) => {
    // Usage example
const exampleSong = {
    title: "Song Title",
    artist: "Artist Name",
    avgWordsPerVerse: 12,
    avgWordsPerLine: 8,
    avgWordLength: 4.5,
  };
  
  const { avgWordsPerVerse, avgWordsPerLine, avgWordLength } = exampleSong;

  return (
    <SongCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {song.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {song.artist}
        </Typography>

        <StatBox>
          <Typography variant="body1" color="text.secondary">
            Average Words per Verse
          </Typography>
          <Typography variant="h6">{avgWordsPerVerse}</Typography>
        </StatBox>

        <StatBox>
          <Typography variant="body1" color="text.secondary">
            Average Words per Line
          </Typography>
          <Typography variant="h6">{avgWordsPerLine}</Typography>
        </StatBox>

        <StatBox>
          <Typography variant="body1" color="text.secondary">
            Average Word Length
          </Typography>
          <Typography variant="h6">{avgWordLength}</Typography>
        </StatBox>
      </CardContent>
    </SongCard>
  );
};

export default SongAveragesCard

