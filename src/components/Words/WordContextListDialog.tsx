import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Word } from "../../types/Word";


interface IWordContextDialogListProps {
  open: boolean;
  onClose: () => void;
  wordOptions: Word[];
  handleContextOpen: (word: Word) => void;
}
const WordContextListDialog = ({
  open,
  onClose,
  wordOptions,
  handleContextOpen,
}: IWordContextDialogListProps) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
      <TableContainer component={Paper} style={{maxHeight: 600, overflowY: 'scroll'}}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Song Names</Typography></TableCell>
            <TableCell><Typography variant="h6">Verse</Typography></TableCell>
            <TableCell><Typography variant="h6">Line</Typography></TableCell>
            <TableCell><Typography variant="h6">Position in Line</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...wordOptions].sort((a, b) => a.name.localeCompare(b.name)).map((word, index) => (
              <TableRow key={index} onClick={() => handleContextOpen(word)}>
              <TableCell>{word.songName}</TableCell>
              <TableCell>{word.verse + 1}</TableCell>
              <TableCell>{word.line + 1}</TableCell>
              <TableCell>{word.lineLocation + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordContextListDialog;
