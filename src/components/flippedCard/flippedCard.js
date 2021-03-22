import React from 'react';
import './flippedCard.css'
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 375,
    padding: '25px',
    marginTop: '25px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const FlippedCard = ({questionIndex, card, question, goToNextQuestion, goToPreviousQuestion}) => {
  const classes = useStyles();
  const flipCard = (event) => {
    const element = event.currentTarget;
    if (element.className === "card") {
      if(element.style.transform === "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <Card className="front">
            {questionIndex === card && (
              <div>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {question}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={goToNextQuestion}>Następne pytanie</Button>
                  <Button size="small" onClick={goToPreviousQuestion}>Poprzednie pytanie</Button>
                  <Button size="small" onClick={flipCard}>Pokaz odpowiedz</Button>
                </CardActions>
              </div>
            )}
          </Card>
          <div className="back">
            <h1>This is the back</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlippedCard;
