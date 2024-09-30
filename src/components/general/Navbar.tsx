import React, { useState } from 'react';
import { AppBar, Tabs, Tab, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import ModuleMenu from './ModuleMenu';


const Navbar = () => {
  const [openTab, setOpenTab] = useLocalStorage<number>("selected_tab", 0);
  return (
    <AppBar position="static" >
      <div style={{ display: 'flex', justifyContent: "space-between", marginRight: 20}}>
      <Tabs value={openTab}>
        <Tab label="Songs" component={Link} to="/" onClick={() => setOpenTab(0)}/>
        <Tab label="Word Index" component={Link} to="/word-index" onClick={() => setOpenTab(1)}/>
        <Tab label="Analysis" component={Link} to="/song-analysis" onClick={() => setOpenTab(2)}/>
      </Tabs>
      <ModuleMenu/>
      </div>

    </AppBar>
  );
};

export default Navbar;