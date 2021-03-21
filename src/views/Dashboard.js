import React, {useCallback, useState} from 'react';
import TopBar from "../components/topBar";
import {useSelector} from "react-redux";
import SimpleCard from "../components/Card";
import {questions} from '../data/questions'

const Dashboard = () => {
  const userData = useSelector(state => state);
  const [questionIndex, nextQuestion] = useState(3);

  const goToNextQuestion = () => {
    nextQuestion(questionIndex + 1)
  };

  const renderCardWithQuestions = () => {
      return questions.map(item => {
        if (item.id === questionIndex) {
          return <SimpleCard
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
