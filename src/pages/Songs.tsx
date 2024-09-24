import React from "react";
import SongForm from "../components/Songs/SongForm";
import ElevatedPaper from "../components/styles/ElevatedPaper";
import SongList from "../components/Songs/SongList";
import { useTheme } from "@mui/material/styles";

const Songs = () => {
    const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 10,
        columnGap: 20,
      }}
    >
      <div>
        <h2 style={{ color: theme.palette.primary.main }}>Loaded Songs</h2>
        <ElevatedPaper>
          <SongList />
        </ElevatedPaper>
      </div>
      <div>
        <h2 style={{ color: theme.palette.primary.main }}>Import Song</h2>
        <ElevatedPaper>
          <SongForm />
        </ElevatedPaper>
      </div>
    </div>
  );
};

export default Songs;
