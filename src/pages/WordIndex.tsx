import React from "react";
import ElevatedPaper from "../components/styles/ElevatedPaper";
import WordTable from "../components/Words/WordTable";

const WordIndex = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "90vw" }}>
        <WordTable />
      </div>
    </div>
  );
};

export default WordIndex;
