// WordGroupDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { WordGroup } from '../../types/WordGroups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IWordGroupDialogProps {
  open: boolean;
  onClose: () => void;
  wordGroups: WordGroup[];
}

const WordGroupDialog = ({ open, onClose, wordGroups }: IWordGroupDialogProps) => {
  const [selectedGroup, setSelectedGroup] = useState<WordGroup | null>(null);
  const [newWord, setNewWord] = useState('');

  const handleGroupClick = (group: WordGroup) => {
    setSelectedGroup(group);
  };

  const handelExitSelection = () => setSelectedGroup(null);

  const handleAddWord = (/* word: Word*/) => {
    if (newWord.trim() && selectedGroup) {
      const updatedWords = [
        ...selectedGroup.words,
        { id: Date.now(), text: newWord },
      ];
      setSelectedGroup({ ...selectedGroup, words: (updatedWords as any) });
      setNewWord('');
    }
  };

  const handleRemoveWord = (id: number) => {
    if (selectedGroup) {
      const updatedWords = selectedGroup.words.filter(word => word.id !== id);
      setSelectedGroup({ ...selectedGroup, words: updatedWords });
    }
  };

  const handleClose = () => {
    setSelectedGroup(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Word Groups</DialogTitle>
      <DialogContent>
        {!selectedGroup ? (
          <List>
            {wordGroups.map(group => (
              <ListItem key={group.id} onClick={() => handleGroupClick(group)}>
                <ListItemText primary={group.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
          <div>
            <IconButton onClick={handelExitSelection}><ArrowBackIcon/></IconButton>
            <h2>{selectedGroup.name}</h2>
          </div>
            <List>
              {selectedGroup.words.map(word => (
                <ListItem key={word.id} secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveWord(word.id)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemText primary={word.name} />
                </ListItem>
              ))}
            </List>
            <TextField
              label="New Word"
              variant="outlined"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleAddWord}>
              <AddIcon />
            </IconButton>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordGroupDialog;
