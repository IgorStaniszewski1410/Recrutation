import React from 'react';
import './flippedCard.css'

const FlippedCard = () => {

  const flipCard = (event) => {
    console.log('dklajbwdkjahbd');

    const element = event.currentTarget;
    console.log(element, 'element');
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
        <div className="card" onClick={flipCard}>
          <div className="front">
            <h1>This is the front</h1>
            <p> Here is some additional text</p>
          </div>
          <div className="back">
            <h1>This is the back</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlippedCard;
