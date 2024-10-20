import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import '../homebutton.css';

const GradeButton = () => {
  const navigate = useNavigate();  // Hook para redirigir

  const handleClick = () => {
    navigate('/grados');  // Redirige a la página de gráficas de grados
  };

  return (
    <div className="box">
      <button className="button" onClick={handleClick}>GRADOS</button> {/* Añadimos el evento onClick */}
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
