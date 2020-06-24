import React from "react";

import Navbar from "./components/Navbar";
import VocabularyCard from "./components/VocabularyCard";
import VocabularyList from "./components/VocabularyList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <VocabularyCard />
      <VocabularyList />
    </div>
  );
}

export default App;
