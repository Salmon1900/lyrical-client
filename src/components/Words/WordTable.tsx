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
import { wordList } from '../../mock/songLyrics';
import { Word } from '../../types/Word';


const WordTable: React.FC = () => {
    const [contextOpen, setContextOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<Word>();

    const handleWordClick = (word: Word) => {
        setSelectedWord(word);
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
            <TableCell><Typography variant="h6">Verse</Typography></TableCell>
            <TableCell><Typography variant="h6">Line</Typography></TableCell>
            <TableCell><Typography variant="h6">Position in Line</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...wordList].sort((a, b) => a.name.localeCompare(b.name)).map((word, index) => (
              <TableRow key={index} onClick={() => handleWordClick(word)}>
              <TableCell>{word.name}</TableCell>
              <TableCell>{word.song_id}</TableCell>
              <TableCell>{word.verse}</TableCell>
              <TableCell>{word.line}</TableCell>
              <TableCell>{word.numInLine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {selectedWord && <WordContextDialog key={selectedWord.id} onClose={handleClose} open={contextOpen} selectedWord={selectedWord}/>}
    </>
  );
};

export default WordTable;
