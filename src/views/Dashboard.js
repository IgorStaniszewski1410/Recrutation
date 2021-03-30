import React, {useCallback, useEffect, useState} from 'react';
import TopBar from "../components/topBar";
import {useDispatch, useSelector} from "react-redux";
import {questions} from '../data/questions'
import FlippedCard from "../components/flippedCard/flippedCard";
import {dispatchAnswer} from '../store/game.js'
import {Box} from '@material-ui/core';

const Dashboard = () => {
  const storeData = useSelector(state => state);
  const [questionIndex, nextQuestion] = useState(1);
  const [answer, setRadioId] = useState({});
  const dispatch = useDispatch();

  const handleChangeRadio = useCallback((id, correctIndex) => {
    setRadioId({
      selectedAnswer: id,
      correctIndex: correctIndex
    })
  }, []);

  const renderSection = (correctIndex, answers) => {
    return (
      <form>
        <Box display="grid" alignItems="center" justifyContent="center" mt={-11}>
          {answers.map(elem => {
            return (
              <Box mt={4} display="block" alignItems="center" justifyContent="center" width={1}>
                <label>
                  <input
                    type="radio"
                    name="picked"
                    checked={answer.selectedAnswer === elem.id}
                    onChange={() => handleChangeRadio(elem.id, correctIndex)}
                  />
                  <span>{elem.value}</span>
                </label>
              </Box>
            )
          })}
        </Box>
      </form>
    )
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
            renderContent={() => renderSection(item.correctIndex, item.answers)}
            answers={item.correctAnswer}
            correctIndex={item.correctIndex}
            setPageIndex={nextQuestion}
            isDisabled={answer.hasOwnProperty('selectedAnswer')}
          />
        } else {
          return null;
        }
      })
  };

  const goToPreviousQuestion = () => {
    nextQuestion(questionIndex - 1)
  };

  const goToNextQuestion = () => {
    dispatch(dispatchAnswer({answer: answer, question: questionIndex + 1}));
    setRadioId({});
    nextQuestion(questionIndex + 1);
  };

  return (
    <div>
      <TopBar userData={storeData}/>
      <Box
        display="flex"
        mt={10}
        alignItems="center"
        justifyContent="center"
      >
        <h1>Welcome {storeData?.user.user.username || ''}</h1>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {renderCardWithQuestions()}</Box>
    </div>
  )
};

export default Dashboard;
