import React from "react";
import { Paper } from "@material-ui/core";

import "./WordCard.css";

const WordCard = (props) => {
  const word = props.word;
  return (
    <Paper variant="outlined" square>
      <p>{word.En_meaning}</p>
    </Paper>
  );
};

export default WordCard;
