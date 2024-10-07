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
import useWords from '../../hooks/words/useWords';


const WordTable: React.FC = () => {
    const [contextOpen, setContextOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<Word>();
    const { isPending, error, words } = useWords();


    const handleWordClick = (word: Word) => {
        setSelectedWord(word);
        setContextOpen(true)
    }

    const handleClose = () => {
        setContextOpen(false);
    }


  return (
    <>
    <TableContainer component={Paper} style={{maxHeight: 600, overflowY: 'scroll'}}>
      <Table stickyHeader>
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
          {[...words].sort((a, b) => a.name.localeCompare(b.name)).map((word, index) => (
              <TableRow key={index} onClick={() => handleWordClick(word)}>
              <TableCell>{word.name}</TableCell>
              <TableCell>{word.songId}</TableCell>
              <TableCell>{word.verse + 1}</TableCell>
              <TableCell>{word.line + 1}</TableCell>
              <TableCell>{word.lineLocation + 1}</TableCell>
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
