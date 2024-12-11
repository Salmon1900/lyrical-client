import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { simpleSongLyrics, wordList } from "../../mock/songLyrics";
import { Word } from "../../types/Word";
import { SeperatedLyrics, SeperatedVerse } from "../../types/Seperated";
import useWords from "../../hooks/words/useWords";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhrase, deletePhrase } from "../../api/phrases";
import usePhrases from "../../hooks/phrases/usePhrases";
import { Delete } from "@mui/icons-material";
import { formatSongFromLyrics } from "./wordUtils";

const paragraphs = [
  "This is the first paragraph.",
  "Here's the second paragraph with some more content.",
  "And this is the third paragraph, just for good measure.",
];

// [ , , , , ]

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
  const [markedText, setMarkedText] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState("");
  const { phrases } = usePhrases(selectedWord.songId);
  const queryClient = useQueryClient();

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setMarkedText(selection.toString());
    }
  };

  const handlePhraseSelect = (event: SelectChangeEvent) => {
    setSelectedPhrase(event.target.value);
  };

  const { mutate: addPhrase } = useMutation({
    mutationFn: createPhrase,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["phrases", selectedWord.songId],
      }),
      onSuccess: (res) => (setMarkedText(""), setSelectedPhrase(String(res.data.id))),
  });

  const { mutate: removePhrase } = useMutation({
    mutationFn: deletePhrase,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["phrases", selectedWord.songId],
      }),
    onSuccess: () => setMarkedText(""),
  });

  const seperatedLyrics = useMemo(() => formatSongFromLyrics(words), [words]);

  const handleNext = () => {
    setCurrentVerse((prevIndex) => (prevIndex + 1) % seperatedLyrics.length);
  };

  const handlePrev = () => {
    setCurrentVerse(
      (prevIndex) =>
        (prevIndex - 1 + seperatedLyrics.length) % seperatedLyrics.length
    );
  };

  const renderPhraseSearchLine = (line: string) => {
    const searchedPhrase =
      phrases.find((p) => p.id === +selectedPhrase)?.phrase || "";
    const regex = new RegExp(`(${searchedPhrase})`, "gi");
    const parts = line.split(regex); // Split the text by the search term

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchedPhrase.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "#3d71e5a3" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const renderSelectedLine = (line: string) => {
    const words = line.split(" ");
    return (
      <h2 style={{ marginTop: 5, marginBottom: 5 }}>
        {words.slice(0, selectedWord.lineLocation).join(" ") + " "}
        <span style={{ color: "cornflowerblue" }}>{selectedWord.name}</span>
        {" " + words.slice(selectedWord.lineLocation + 1).join(" ")}
      </h2>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Find Phrase</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPhrase}
            label="Find Phrase"
            renderValue={(val) => val ? phrases.find(p => p.id === +val)?.phrase : "None"}
            onChange={handlePhraseSelect}
          >
            <MenuItem value={""}>None</MenuItem>
            {phrases?.map((p) => (
              <MenuItem
                value={p.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {p.phrase}{" "}
                <Button
                  onClick={(e) =>
                  {
                    e.stopPropagation()
                    removePhrase({
                      songId: selectedWord.songId,
                      phrase: p.phrase,
                    })
                  }
                  }
                >
                  <Delete />
                </Button>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          onMouseUp={handleMouseUp}
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {combineVerseLyrics(seperatedLyrics[currentVerse])
            .split("\n")
            .map((line, lineIndex) =>
              selectedPhrase ? (
                <p style={{ marginTop: 5, marginBottom: 5 }}>
                  {renderPhraseSearchLine(line)}
                </p>
              ) : (
                <>
                  {selectedWord.verse === currentVerse &&
                  selectedWord.line === lineIndex ? (
                    renderSelectedLine(line)
                  ) : (
                    <p style={{ marginTop: 5, marginBottom: 5 }}>{line}</p>
                  )}
                </>
              )
            )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={handlePrev} disabled={currentVerse === 0}>
          &lt; Prev
        </Button>
        {markedText && (
          <Button
            onClick={() =>
              addPhrase({ songId: selectedWord.songId, phrase: markedText })
            }
          >
            Define phrase: "{markedText}"
          </Button>
        )}
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
