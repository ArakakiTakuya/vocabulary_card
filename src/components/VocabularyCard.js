import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import WordCard from "./WordCard";

import "./VocabularyCard.css";

const VocabularyCard = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };
  const words = useSelector((state) => state.words);
  return (
    <div className="vocabulary-card-container">
      <Carousel responsive={responsive}>
        {words.map((word) => (
          <WordCard word={word} key={word.Id} />
        ))}
      </Carousel>
    </div>
  );
};

export default VocabularyCard;
