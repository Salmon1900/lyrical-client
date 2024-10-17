import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import WordGroupDialog from '../WordGroups/WordGroupDialog';
import { wordGroups } from '../../mock/wordGroups';

const ModuleMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [wordGroupDialogOpen, setWordGroupDialogOpen] = useState(false);
  const [phraseDialogOpen, setPhraseDialogOpen] = useState(false);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <IconButton onClick={handleClick}><AppRegistrationIcon/></IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => (handleClose(), setWordGroupDialogOpen(true))}>
          <ListItemIcon>
            <FormatListNumberedIcon fontSize="small" />
          </ListItemIcon>
          My Word Groups
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TextDecreaseIcon fontSize="small" />
          </ListItemIcon>
          My Phrases
        </MenuItem>
      </Menu>
      <WordGroupDialog open={wordGroupDialogOpen} onClose={() => setWordGroupDialogOpen(false)}/>
    </>
  );
}

export default ModuleMenu;
