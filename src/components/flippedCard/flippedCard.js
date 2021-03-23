import React, {useState} from 'react';
import './flippedCard.css'
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";

import {makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";

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
  setPageIndex
}) => {
  const classes = useStyles();
  const storeData = useSelector(state => state);
  const [page, setFrontPage] = useState(1);

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

  const showAnswers = () => {
    return storeData.game.scores.map(item => {
      return (
        <ul>
          <li>{item.picked}</li>
        </ul>
      )
    })
  }
  const isGameFinished = questionIndex === card && questionIndex < 5
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
                <h3>Koniec gry, rozpocznij od nowa</h3>
                <Button variant="contained" color="primary" onClick={() => setPageIndex(1)}>
                  Nowa gra
                </Button>
                <Box>
                  <h3>Wybrane odpowiedzi:</h3>
                  <span>{showAnswers()}</span>
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
          <Button variant="outlined" color="primary" onClick={goToNextQuestion}>Następne pytanie></Button>
          <Button variant="outlined" color="primary" onClick={goToPreviousQuestion}>Poprzednie pytanie></Button>
        </Box>
      ) : null}
      {isGameFinished ? (
        <Box mt={2}>
          {page === 2 ? (
            <Button variant="contained" color="primary" onClick={flipCard}>
              Pokaz pytanie
            </Button>
          ) : <Button variant="contained" color="primary" onClick={flipCard}>
            Pokaz odpowiedz
          </Button>}
        </Box>
      ) : null}
        <div>
      </div>
    </div>
  )
}

export default FlippedCard;
