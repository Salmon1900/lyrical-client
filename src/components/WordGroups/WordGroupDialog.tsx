// WordGroupDialog.tsx
import React, { useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { WordGroup } from "../../types/WordGroups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWords from "../../hooks/words/useWords";
import useGroups from "../../hooks/groups/useGroups";
import { Word } from "../../types/Word";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWordToGroup, createGroup, deleteWordFromGroup } from "../../api/groups";

const capitalize = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`;

interface IWordGroupDialogProps {
  open: boolean;
  onClose: () => void;
}

type WordsInGroup = {
  [word: string]: number;
};

const WordGroupDialog = ({ open, onClose }: IWordGroupDialogProps) => {
  const { groups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<WordGroup | null>(null);
  const queryClient = useQueryClient();
  const { words } = useWords();
  const [newValue, setNewValue] = useState("");

  useEffect(
    () =>
      setSelectedGroup((prev) => groups.find((g) => g.id == prev?.id) || null),
    [groups]
  );

  const { mutate: addWord } = useMutation({
    mutationFn: addWordToGroup,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
    onSuccess: () => setNewValue(""),
  });

  const { mutate: addGroup } = useMutation({
    mutationFn: createGroup,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
    onSuccess: () => setNewValue(""),
  });

  const { mutate: removeWord } = useMutation({
    mutationFn: deleteWordFromGroup,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });

  const handleGroupClick = (group: WordGroup) => {
    setSelectedGroup(group);
  };

  const handelExitSelection = () => setSelectedGroup(null);

  const handleAddGroup = (/* word: Word*/) => {
    if (newValue.trim()) {
      addGroup({ name: newValue });
    }
  };

  const handleAddWord = (/* word: Word*/) => {
    if (newValue.trim() && selectedGroup) {
      addWord({ groupId: selectedGroup.id, word: newValue });
    }
  };

  const handleRemoveWord = (word: string) => {
    if (selectedGroup) {
      removeWord({ groupId: selectedGroup.id, word });
    }
  };

  const handleClose = () => {
    setSelectedGroup(null);
    onClose();
  };

  const selectedGroupWords: WordsInGroup = useMemo(() => {
    return words.reduce((obj: WordsInGroup, curr: Word) => {
      // If word in group add to counting
      if (selectedGroup?.wordIds.includes(curr.id)) {
        let key = curr.name.toLowerCase();
        return { ...obj, [key]: obj[key] ? obj[key] + 1 : 1 };
      } else return obj;
    }, {});
  }, [selectedGroup, words]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Word Groups</DialogTitle>
      <DialogContent>
        {!selectedGroup ? (
          <List>
            {groups.map((group) => (
              <ListItem key={group.id} onClick={() => handleGroupClick(group)}>
                <ListItemText primary={group.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <div>
              <IconButton onClick={handelExitSelection}>
                <ArrowBackIcon />
              </IconButton>
              <h2>{selectedGroup.name}</h2>
            </div>
            <List>
              {Object.entries(selectedGroupWords).map((word) =>
                word ? (
                  <ListItem
                    key={word[0]}
                    sx={{ borderLeft: "1px solid grey", marginBottom: 2 }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveWord(word[0])}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${capitalize(word[0])}   ►   ${
                        word[1]
                      } occurrences`}
                    />
                  </ListItem>
                ) : (
                  <p>Error finding word</p>
                )
              )}
            </List>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <TextField
            label={selectedGroup ? "Add new word" : "Create group"}
            variant="outlined"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
          />
          <IconButton onClick={(e) => selectedGroup ? handleAddWord() : handleAddGroup()}>
            <AddIcon />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordGroupDialog;
