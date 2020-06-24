import React from "react";
import { useSelector } from "react-redux";

import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import "./VocabularyList.css";

const VocabularyList = () => {
  const words = useSelector((state) => state.words);
  return (
    <>
      <h2>収録単語一覧({words.length})</h2>
      <div className="vocabulary_list">
        {words.map((word, i) => (
          <Paper variant="outlined" square className="paper" key={i}>
            <h4>{word.En_meaning}</h4>
            <h5> {word.Ja_meaning}</h5>
          </Paper>
        ))}
      </div>
      <div className="btn">
        <Button variant="contained" color="primary">
          Add new word
        </Button>
      </div>
    </>
  );
};

export default VocabularyList;
