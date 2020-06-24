import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import VocabularyCard from "./components/VocabularyCard";
import VocabularyList from "./components/VocabularyList";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getWords();
  }, []);

  async function getWords() {
    const prom = await fetch("/api/words");
    const data = await prom.json();
    dispatch({ type: "SET_WORDS", words: data });
  }

  return (
    <div className="App">
      <Navbar />
      <VocabularyCard />
      <VocabularyList />
    </div>
  );
}

export default App;
