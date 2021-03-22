import React from 'react';
import './flippedCard.css'
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 375,
    padding: '25px',
    marginTop: '25px'
  },
  title: {
    fontSize: 14,
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
  correctIndex
}) => {
  const classes = useStyles();

  const flipCard = () => {
    const element = document.getElementById('card');
    console.log(element, 'element');
    if (element.className === 'cardSection') {
      if(element.style.transform === "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  return (
    <div className="container">
      <div id="card" className="cardSection">
        <Card className="front">
          {questionIndex === card && (
            <>
              <Box mt={4}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {question}
                </Typography>
              </Box>
              <Box>
                {renderContent()}
              </Box>
              <div>
                <Button size="small" onClick={goToNextQuestion}>Następne pytanie</Button>
                <Button size="small" onClick={goToPreviousQuestion}>Poprzednie pytanie</Button>
              </div>
            </>
          )}
        </Card>
        <div className="back">
          <h1>This is the back</h1>
        </div>
      </div>
      <Button onClick={flipCard}>Pokaz odpowiedz</Button>
    </div>
  )
}

export default FlippedCard;
