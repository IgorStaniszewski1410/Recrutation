import React, {useState} from 'react';
import TopBar from "../components/topBar";
import {useDispatch, useSelector} from "react-redux";
import {questions} from '../data/questions'
import FlippedCard from "../components/flippedCard/flippedCard";
import { Formik, Field, Form } from 'formik';
import {dispatchAnswer} from '../store/game.js'
import {Box, Button} from '@material-ui/core';

const Dashboard = () => {
  const storeData = useSelector(state => state);
  const [questionIndex, nextQuestion] = useState(1);
  const dispatch = useDispatch();

  console.log(storeData, 'storeData');
  const renderSection = (correctIndex, answers) => {
    return (
      <Formik
        initialValues={{
          picked: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 10));
          dispatch(dispatchAnswer({answer: values}))
        }}
      >
        {({ values }) => (
          <Form>
            <Box display="grid" alignItems="center" justifyContent="center" mt={-11}>
              {answers.map(elem => {
                return (
                  <Box mt={4} display="block" alignItems="center" justifyContent="center" width={1}>
                    <label>
                      <Field type="radio" name="picked" value={elem} />
                      <span>{elem}</span>
                    </label>
                  </Box>
                )
              })}
              <Button variant="outlined" color="primary" type="submit" size="small">
                Wybierz odpowiedz
              </Button>
            </Box>
            <Box ml={2} mt={4}>Wybrane: {values.picked}</Box>
          </Form>
        )}
      </Formik>
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
        <h1>Witaj {storeData?.user.user.username || ''}</h1>
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
