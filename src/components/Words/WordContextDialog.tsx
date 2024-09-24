import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { simpleSongLyrics } from '../../mock/songLyrics';
import { Word } from '../../types/Word';
import { SeperatedLyrics, SeperatedVerse } from '../../types/Seperated';

const paragraphs = [
  "This is the first paragraph.",
  "Here's the second paragraph with some more content.",
  "And this is the third paragraph, just for good measure.",
];

// [ , , , , ]

const formatSongFromLyrics = (words: Word[]): SeperatedLyrics => {
    const seperatedLyrics: SeperatedLyrics = words.reduce((obj, word) => {
        const { verse, line, position, name } = word;

        if(!obj[verse]) obj[verse] = []
        if(!obj[verse][line]) obj[verse][line] = []

        obj[verse][line][position] = name;

        return obj;
        
    }, [] as any)

    return seperatedLyrics;
}

const seperateSongLyrics = (song: string): SeperatedLyrics => {
    const seperatedLyrics: SeperatedLyrics = [];

    simpleSongLyrics.split("\n\n").forEach((verse, verseIndex) => {
        verse.split('\n').forEach((line, lineIndex) => {
            line.split(" ").forEach((word, wordIndex) => {
                if(!seperatedLyrics[verseIndex]) seperatedLyrics[verseIndex] = []
                if(!seperatedLyrics[verseIndex][lineIndex]) seperatedLyrics[verseIndex][lineIndex] = []

                seperatedLyrics[verseIndex][lineIndex][wordIndex] = word
            })
        })
    });

    return seperatedLyrics;
}

const combineVerseLyrics = (seperatedVerse: SeperatedVerse) => {
    const lines = seperatedVerse.map(line => line.join(" "));
    return lines.join("\n");
}



interface IWordContextDialogProps { 
    open: boolean; 
    onClose: () => void 
}
const WordContextDialog = ({ open, onClose }: IWordContextDialogProps) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [seperatedLyrics, setSeperatedLyrics] = useState<SeperatedLyrics>(() => seperateSongLyrics(simpleSongLyrics)) 

  const handleNext = () => {
    setCurrentVerse((prevIndex) => (prevIndex + 1) % seperatedLyrics.length);
  };

  const handlePrev = () => {
    setCurrentVerse((prevIndex) => (prevIndex - 1 + seperatedLyrics.length) % seperatedLyrics.length);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            {combineVerseLyrics(seperatedLyrics[currentVerse])}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handlePrev} disabled={currentVerse === 0}>
          &lt; Prev
        </Button>
        <Button onClick={handleNext} disabled={currentVerse === seperatedLyrics.length - 1}>
          Next &gt;
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordContextDialog;