import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import WordContextDialog from './WordContextDialog';

interface Word {
  name: string;
  songName: string;
  location: string;
  verseNumber: number;
  lineNumber: number;
}

const words: Word[] = [
  { name: 'Grace', songName: 'Amazing Grace', location: 'Hymn', verseNumber: 1, lineNumber: 1 },
  { name: 'Love', songName: 'All You Need Is Love', location: 'The Beatles', verseNumber: 1, lineNumber: 2 },
  { name: 'Hope', songName: 'You’ve Got a Friend', location: 'James Taylor', verseNumber: 2, lineNumber: 3 },
  { name: 'Joy', songName: 'Joy to the World', location: 'Christmas Carol', verseNumber: 1, lineNumber: 4 },
  { name: 'Peace', songName: 'Let There Be Peace on Earth', location: 'Hymn', verseNumber: 1, lineNumber: 5 },
];

const WordTable: React.FC = () => {
    const [contextOpen, setContextOpen] = useState(false);

    const handleWordClick = () => {
        setContextOpen(true)
    }

    const handleClose = () => {
        setContextOpen(false);
    }


  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Word</Typography></TableCell>
            <TableCell><Typography variant="h6">Song Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Verse Number</Typography></TableCell>
            <TableCell><Typography variant="h6">Line Number</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map((word, index) => (
              <TableRow key={index} onClick={() => handleWordClick()}>
              <TableCell>{word.name}</TableCell>
              <TableCell>{word.songName}</TableCell>
              <TableCell>{word.location}</TableCell>
              <TableCell>{word.verseNumber}</TableCell>
              <TableCell>{word.lineNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <WordContextDialog onClose={handleClose} open={contextOpen}/>
    </>
  );
};

export default WordTable;
