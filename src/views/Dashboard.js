import React, {useCallback, useState} from 'react';
import TopBar from "../components/topBar";
import {useSelector} from "react-redux";
import {questions} from '../data/questions'
import FlippedCard from "../components/flippedCard/flippedCard";

const Dashboard = () => {
  const userData = useSelector(state => state);
  const [questionIndex, nextQuestion] = useState(3);

  const goToNextQuestion = () => {
    nextQuestion(questionIndex + 1)
  };

  const renderCardWithQuestions = () => {
      return questions.map(item => {
        if (item.id === questionIndex) {
          return <FlippedCard
            goToNextQuestion={goToNextQuestion}
            goToPreviousQuestion={goToPreviousQuestion}
            card={item.id}
            questionIndex={questionIndex}
            question={item.question}
          />
        } else {
          return null;
        }
      })
  };

  const goToPreviousQuestion = () => {
    nextQuestion(questionIndex - 1)
  };

  return (
    <div>
      <TopBar userData={userData}/>
      {renderCardWithQuestions()}
    </div>
  )
};

export default Dashboard;
