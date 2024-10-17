import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import WordContextDialog from "./WordContextDialog";
import { wordList } from "../../mock/songLyrics";
import { Word, WordFilters } from "../../types/Word";
import useWords from "../../hooks/words/useWords";
import WordContextListDialog from "./WordContextListDialog";
import WordTableFilters from "./WordTableFilters";

type WordRecord = {
  word: string;
  occurenceCount: number;
  songs: string[];
  instances: Word[];
};

type WordRecordObj = {
  [key: string]: WordRecord;
};

const WordTableHeader = ({
  text,
  fS,
  fW,
}: {
  text: string;
  fS?: number;
  fW?: number;
}) => (
  <TableCell sx={{ textAlign: "center", borderLeft: "1px solid grey" }}>
    <Typography variant="h6">{text}</Typography>
  </TableCell>
);

const WordTableCell = ({
  text,
  fS = 16,
  fW = 150,
  tA = "left",
}: {
  text: string | number;
  tA?: string;
  fS?: number;
  fW?: number;
}) => (
  <TableCell
    sx={{
      fontSize: fS,
      fontWeight: fW,
      textAlign: tA,
      borderLeft: "1px solid grey",
    }}
  >
    {String(text)}
  </TableCell>
);

const WordTable: React.FC = () => {
  const [contextOpen, setContextOpen] = useState(false);
  const [contextListOpen, setContextListOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [wordOptionsName, setWordOptionsName] = useState<string>("");
  const [wordOptions, setWordOptions] = useState<Word[]>([]);
  const [filters, setFilters] = useState<WordFilters>({});
  const { isPending, error, words } = useWords();

  const wordRecords: WordRecord[] = useMemo(() => {
    const filteredWords = words.filter(
      (word) =>
        (!filters.ids ||
          !filters.ids.length ||
          filters.ids.includes(word.id)) &&
        (!filters.songIds ||
          !filters.songIds.length ||
          filters.songIds.includes(word.songId)) &&
        (!filters.text || word.name.toLowerCase().includes(filters.text.toLowerCase())) &&
        (filters.verse === undefined || word.verse === filters.verse) &&
        (filters.line === undefined || word.line === filters.line)
    );
    const wordRecordObj = filteredWords.reduce((obj, currWord) => {
      let newObj = { ...obj };
      let w = currWord.name.toLowerCase();
      if (obj[w]) {
        newObj[w].occurenceCount += 1;
        newObj[w].instances.push(currWord);
        if (!newObj[w].songs.includes(currWord.songName))
          newObj[w].songs.push(currWord.songName);
      } else {
        newObj[w] = {
          instances: [currWord],
          occurenceCount: 1,
          songs: [currWord.songName],
          word: currWord.name,
        };
      }

      return newObj;
    }, {} as WordRecordObj);

    return Object.values(wordRecordObj);
  }, [words, filters]);

  const handleWordClick = (wordRecord: WordRecord) => {
    if (wordRecord.instances.length === 1) {
      handleContextOpen(wordRecord.instances[0]);
    } else {
      setWordOptions(wordRecord.instances);
      setWordOptionsName(wordRecord.word);
      setContextListOpen(true);
    }
  };

  const handleContextOpen = (word: Word) => {
    setSelectedWord(word);
    setContextOpen(true);
  };

  const handleContextClose = () => {
    setContextOpen(false);
  };

  const handleContextListClose = () => {
    setContextListOpen(false);
  };

  const capitalize = (word: string) =>
    `${word[0].toUpperCase()}${word.slice(1)}`;

  return (
    <>
      <div style={{ display: 'flex'}}>
        <TableContainer
          component={Paper}
          style={{ maxHeight: 600, overflowY: "scroll", width: 900 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <WordTableHeader text={"Word"} />
                <WordTableHeader text={"Song Name"} />
                <WordTableHeader text={"Occurences"} />
                <WordTableHeader text={"Verse"} />
                <WordTableHeader text={"Line"} />
                <WordTableHeader text={"Position in Line"} />
              </TableRow>
            </TableHead>
            <TableBody>
              {[...wordRecords]
                .sort((a, b) => a.word.localeCompare(b.word))
                .map((word, index) => (
                  <TableRow key={index} onClick={() => handleWordClick(word)}>
                    <WordTableCell
                      text={capitalize(word.instances[0].name)}
                      fS={20}
                      fW={700}
                    />
                    <WordTableCell
                      text={word.songs.join(", ")}
                      fS={16}
                      fW={400}
                    />
                    <WordTableCell
                      tA={"center"}
                      fW={600}
                      fS={18}
                      text={word.occurenceCount}
                    />
                    <WordTableCell
                      tA={"center"}
                      fW={600}
                      fS={18}
                      text={
                        word.instances.length === 1
                          ? word.instances[0].verse + 1
                          : ``
                      }
                    />
                    <WordTableCell
                      tA={"center"}
                      fW={600}
                      fS={18}
                      text={
                        word.instances.length === 1
                          ? word.instances[0].line + 1
                          : ""
                      }
                    />
                    <WordTableCell
                      tA={"center"}
                      fW={600}
                      fS={18}
                      text={
                        word.instances.length === 1
                          ? word.instances[0].lineLocation + 1
                          : ""
                      }
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <WordTableFilters filters={filters} setFilters={setFilters} />
        {!!wordOptions.length && (
          <WordContextListDialog
            open={contextListOpen}
            onClose={handleContextListClose}
            key={wordOptionsName}
            wordOptions={wordOptions}
            handleContextOpen={handleContextOpen}
          />
        )}
        {selectedWord && (
          <WordContextDialog
            key={selectedWord.id}
            onClose={handleContextClose}
            open={contextOpen}
            selectedWord={selectedWord}
          />
        )}
      </div>
    </>
  );
};

export default WordTable;
