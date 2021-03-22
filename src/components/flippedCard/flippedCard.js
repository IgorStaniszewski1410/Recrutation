import React, {useState} from 'react';
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
  answers
}) => {
  const classes = useStyles();
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

  console.log(page, 'page');
  return (
    <div className="container">
      <div id="card" className="cardSection">
        <Card className="front">
          {questionIndex === card && questionIndex < 6 ? (
            <>
              <Box mt={4}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {question}
                </Typography>
              </Box>
              <Box>
                {renderContent()}
              </Box>
            </>
          ) : <div>koniec gry, rozpocznij od nowa</div>}
        </Card>
        <div className="back">
          <h1>{questionIndex === card && answers}</h1>
        </div>
      </div>
      <div>
        <Button size="small" onClick={goToNextQuestion}>Następne pytanie</Button>
        <Button size="small" onClick={goToPreviousQuestion}>Poprzednie pytanie</Button>
      </div>
      {page === 2 ? (
        <Button onClick={flipCard}>
          Pokaz pytanie
        </Button>
      ) : <Button onClick={flipCard}>
        Pokaz odpowiedz
      </Button>}
      <div>
      </div>
    </div>
  )
}

export default FlippedCard;
