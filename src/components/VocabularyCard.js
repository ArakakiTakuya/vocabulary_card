import React from "react";
import { useSelector } from "react-redux";

const VocabularyCard = () => {
  const words = useSelector((state) => state.words);
  return (
    <div className="vocabulary_card_container">
      {words.map((word, i) => (
        <div className="vocabulary_card" key={i}>
          <p>{word.En_meaning}</p>
          <p>{word.Ja_meaning}</p>
        </div>
      ))}
    </div>
  );
};

export default VocabularyCard;
