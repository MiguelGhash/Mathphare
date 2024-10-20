import React from 'react';
import './home.css';
import GradeButton from './buttons/Grados/GradeButton';  // Importa HomeButton con mayúscula
import RadianButton from './buttons/radians/RadianButton';  // Importa HomeButton con mayúscula

const Home = () => {
  return (
    <div className="mathphare-banner">
      <div className="background-image"></div>
      <div className="content">
        <h1>MATHPHARE</h1>
        <p>Calculadora gráfica</p>
        <div className="button-container">
          <GradeButton /> 
          <RadianButton /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
