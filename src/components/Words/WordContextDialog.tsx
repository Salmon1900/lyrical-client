import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { simpleSongLyrics, wordList } from "../../mock/songLyrics";
import { Word } from "../../types/Word";
import { SeperatedLyrics, SeperatedVerse } from "../../types/Seperated";
import useWords from "../../hooks/words/useWords";

const paragraphs = [
  "This is the first paragraph.",
  "Here's the second paragraph with some more content.",
  "And this is the third paragraph, just for good measure.",
];

// [ , , , , ]

const formatSongFromLyrics = (words: Word[]): SeperatedLyrics => {
  const seperatedLyrics: SeperatedLyrics = words.reduce((obj, word) => {
    const { verse, line, lineLocation, name } = word;

    if (!obj[verse]) obj[verse] = [];
    if (!obj[verse][line]) obj[verse][line] = [];

    obj[verse][line][lineLocation] = name;

    return obj;
  }, [] as any);

  return seperatedLyrics;
};

const seperateSongLyrics = (song: string): SeperatedLyrics => {
  const seperatedLyrics: SeperatedLyrics = [];

  simpleSongLyrics.split("\n\n").forEach((verse, verseIndex) => {
    verse.split("\n").forEach((line, lineIndex) => {
      line.split(" ").forEach((word, wordIndex) => {
        if (!seperatedLyrics[verseIndex]) seperatedLyrics[verseIndex] = [];
        if (!seperatedLyrics[verseIndex][lineIndex])
          seperatedLyrics[verseIndex][lineIndex] = [];

        seperatedLyrics[verseIndex][lineIndex][wordIndex] = word;
      });
    });
  });

  return seperatedLyrics;
};

const combineVerseLyrics = (seperatedVerse: SeperatedVerse = []) => {
  const lines = seperatedVerse.map((line) => line.join(" "));
  return lines.join("\n");
};

interface IWordContextDialogProps {
  open: boolean;
  onClose: () => void;
  selectedWord: Word;
}
const WordContextDialog = ({
  open,
  onClose,
  selectedWord,
}: IWordContextDialogProps) => {
  const [currentVerse, setCurrentVerse] = useState(selectedWord.verse);
//   const { words } = useWords(10);
  const { words } = useWords(selectedWord.songId);

  const seperatedLyrics = useMemo(() => formatSongFromLyrics(words), [words])

  const handleNext = () => {
    setCurrentVerse((prevIndex) => (prevIndex + 1) % seperatedLyrics.length);
  };

  const handlePrev = () => {
    setCurrentVerse(
      (prevIndex) =>
        (prevIndex - 1 + seperatedLyrics.length) % seperatedLyrics.length
    );
  };

  const renderSelectedLine = (line: string) => {
    const words = line.split(" ");
    return (
        <h2  style={{ marginTop: 5, marginBottom: 5}}>
            {words.slice(0, selectedWord.lineLocation).join(" ") + " "}
            <span style={{ color: 'cornflowerblue'}}>{selectedWord.name}</span>
            {" " + words.slice(selectedWord.lineLocation + 1).join(" ")}
        </h2>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {combineVerseLyrics(seperatedLyrics[currentVerse])
            .split("\n")
            .map((line, lineIndex) => (
              <>
                {selectedWord.verse === currentVerse &&
                selectedWord.line === lineIndex ? (
                  renderSelectedLine(line)
                ) : (
                  <p style={{ marginTop: 5, marginBottom: 5}}>{line}</p>
                )}
              </>
            ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={handlePrev} disabled={currentVerse === 0}>
          &lt; Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentVerse === seperatedLyrics.length - 1}
        >
          Next &gt;
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordContextDialog;
