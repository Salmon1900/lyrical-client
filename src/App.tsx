import React from "react";
import { Routes, Route } from "react-router-dom";
import Songs from "./pages/Songs";
import WordIndex from "./pages/WordIndex";
import Analysis from "./pages/Analysis.";
import Navbar from "./components/general/Navbar";
import Theme from "./components/styles/Theme";

function App() {
  return (
    <Theme>
      <div >
        <Navbar />
        <Routes>
          <Route path="/" element={<Songs />} />
          <Route path="/word-index" element={<WordIndex />} />
          <Route path="/song-analysis" element={<Analysis />} />
        </Routes>
      </div>
    </Theme>
  );
}

export default App;
