import React from 'react';
import '../homebutton.css';

const GradeButton = () => {  // Cambiado a HomeButton
  return (
    <div className="box">
      <button className="button">RADIANES</button>
      <div className="space">
        <span style={{ '--i': 31 }} className="star"></span>
        <span style={{ '--i': 12 }} className="star"></span>
        <span style={{ '--i': 57 }} className="star"></span>
        <span style={{ '--i': 93 }} className="star"></span>
        <span style={{ '--i': 23 }} className="star"></span>
        <span style={{ '--i': 70 }} className="star"></span>
        <span style={{ '--i': 6 }} className="star"></span>
      </div>
    </div>
  );
};

export default GradeButton;
