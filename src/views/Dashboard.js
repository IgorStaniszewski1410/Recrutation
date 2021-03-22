import React, {useState} from 'react';
import TopBar from "../components/topBar";
import {useDispatch, useSelector} from "react-redux";
import {questions} from '../data/questions'
import FlippedCard from "../components/flippedCard/flippedCard";
import { Formik, Field, Form } from 'formik';
import {dispatchAnswer} from '../store/game.js'
import Container from '@material-ui/core/Container';

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
            {answers.map(elem => {
                return (
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="picked" value={elem} /> {elem}
                    </label>
                  </div>
                )
            })}
            <div>Wybrane: {values.picked}</div>
            <button type="submit">Submit</button>
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
    <Container>
      <TopBar userData={storeData}/>
      {renderCardWithQuestions()}
    </Container>
  )
};

export default Dashboard;
