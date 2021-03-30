import React, {useCallback, useEffect, useState} from 'react';
import './flippedCard.css'
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";

import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {endGame, resetScores} from '../../store/game.js'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 375,
    padding: '25px',
    marginTop: '25px'
  },
  title: {
    textAlign: 'center',
    fontSize: '23px',
    color: '#3f51b5',
  },
  pos: {
    marginBottom: 12,
  },
});

const FlippedCard = ({
  questionIndex,
  card,
  question,
  goToNextQuestion,
  goToPreviousQuestion,
  renderContent,
  answers,
  setPageIndex,
  isDisabled
}) => {
  const classes = useStyles();
  const storeData = useSelector(state => state);
  const [page, setFrontPage] = useState(1);
  const dispatch = useDispatch();

  const flipCard = () => {
    const element = document.getElementById('card');
    if (element.className === 'cardSection') {
      if(element.style.transform === "rotateY(180deg)") {
        setFrontPage(1);
        element.style.transform = "rotateY(0deg)";
      }
      else {
        setFrontPage(2);
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  const getResult = useCallback(() => {
    const filteredValues = storeData.game.scores ? storeData.game.scores.filter(item => item.selectedAnswer) : [];
    return filteredValues.filter(item => item.selectedAnswer === item.correctIndex);
  }, [storeData.game.scores]);

  const isGameFinished = questionIndex === card && questionIndex < 5;

  useEffect(() => {
    getResult()
  }, [getResult, storeData]);

  questionIndex === 5 && dispatch(endGame({isGameFinished: true}));

  const startNewGame = useCallback(() => {
    setPageIndex(1);
    dispatch(resetScores())
  }, [setPageIndex, dispatch]);

  return (
    <div className="container">
      <div id="card" className="cardSection">
        <Card className="front">
          {questionIndex === card && questionIndex < 5 ? (
            <>
              <Box mt={4} display="flex" alignItems="center" justifyContent="center">
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {question}
                </Typography>
              </Box>
              <Box>
                {renderContent()}
              </Box>
            </>
          ) : <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box ml={2}>
                <h3>End of game, start a new one</h3>
                <Button variant="contained" color="primary" onClick={startNewGame}>
                  New game
                </Button>
                <Box mt={4}>
                  Your Score: {getResult().length}
                </Box>
              </Box>
            </Box>
          </Box>}
        </Card>
        <div className="back">
          <h1>{questionIndex === card && answers}</h1>
        </div>
      </div>
      {isGameFinished ? (
        <Box display="flex" justifyContent="space-between" height="60px" mt={2}>
          <Button
            disabled={!isDisabled}
            variant="outlined"
            color="primary"
            onClick={goToNextQuestion}>Next question></Button>
          <Button variant="outlined" color="primary" onClick={goToPreviousQuestion}>Previous question></Button>
        </Box>
      ) : null}
      {isGameFinished ? (
        <Box mt={2}>
          {page === 2 ? (
            <Button variant="contained" color="primary" onClick={flipCard}>
              Show question
            </Button>
          ) : <Button variant="contained" color="primary" onClick={flipCard}>
            Show answer
          </Button>}
        </Box>
      ) : null}
        <div>
      </div>
    </div>
  )
}

export default FlippedCard;
