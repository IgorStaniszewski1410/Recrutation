import React, {useCallback, useEffect} from 'react';
import TopBar from "../components/topBar";
import {useSelector} from "react-redux";

const Scores = () => {
  const storeData = useSelector(state => state);
  const getResult = useCallback(() => {
    const filteredValues = storeData.game.scores ? storeData.game.scores.filter(item => item.selectedAnswer) : [];
    return filteredValues.filter(item => item.selectedAnswer === item.correctIndex);
  }, [storeData.game.scores]);

  useEffect(() => {
    getResult()
  }, [getResult, storeData]);
  return (
    <div>
      <TopBar />
        Scores here...
    </div>
  )
};

export default Scores;
