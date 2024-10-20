import React, { useState, useCallback, useRef, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { Plus, X } from 'lucide-react';
import './GrapherGrades.css';

const GrapherGrades = () => {
  const [equations, setEquations] = useState([{ id: 1, text: 'x', color: '#2d70b3' }]);
  const [range, setRange] = useState([-10, 10]);
  const graphRef = useRef(null);
  const [graphSize, setGraphSize] = useState({ width: 1000, height: 600 });

  const colors = ['#ff0000', '#2d70b3', '#00ff00', '#800080', '#ffff00', '#a52a2a', '#000000', '#808080'];

  useEffect(() => {
    const updateSize = () => {
      const height = window.innerHeight * 0.95;
      const width = window.innerWidth * 0.7;
      setGraphSize({ width: width, height: height });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const generatePoints = useCallback((eq, xRange, numPoints = 1000) => {
    const [min, max] = xRange;
    const step = (max - min) / (numPoints - 1);
    const xValues = Array.from({ length: numPoints }, (_, i) => min + i * step);
    const yValues = xValues.map(x => {
      try {
        return evaluate(eq, { x });
      } catch (error) {
        return NaN;
      }
    });
    return [xValues, yValues];
  }, []);

  const handleEquationChange = (id, newText) => {
    setEquations(eqs => eqs.map(eq => eq.id === id ? { ...eq, text: newText } : eq));
  };

  const handleColorChange = (id) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setEquations(eqs => eqs.map(eq => eq.id === id ? { ...eq, color: randomColor } : eq));
  };

  const addEquation = () => {
    const newId = Math.max(...equations.map(eq => eq.id), 0) + 1;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setEquations([...equations, { id: newId, text: '', color: randomColor }]);
  };

  const removeEquation = (id) => {
    setEquations(eqs => eqs.filter(eq => eq.id !== id));
  };

  const saveGraphAsImage = () => {
    const plotElement = graphRef.current.querySelector('.react-plotly.js-plotly-plot');
    if (plotElement) {
      plotElement.toImage({ format: 'png' })
        .then(url => {
          const link = document.createElement('a');
          link.href = url;
          link.download = 'grafica.png';
          link.click();
        })
        .catch(error => {
          console.error('Error al guardar la gráfica:', error);
        });
    }
  };

  return (
    <div className="grapher-container">
      <div className="graph-area" ref={graphRef}>
        <Plot
          data={equations.map(eq => {
            const [xValues, yValues] = generatePoints(eq.text, range);
            return {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'lines',
              line: { color: eq.color },
            };
          })}
          layout={{
            width: graphSize.width,
            height: graphSize.height,
            plot_bgcolor: '#194550',
            paper_bgcolor: '#194550',
            font: { color: 'white' },
            xaxis: { 
              range: range, 
              gridcolor: '#a5a5a5',
              zerolinecolor: '#000000',
              zerolinewidth: 3,
              gridwidth: 1,
              linewidth: 1,
            },
            yaxis: { 
              range: range, 
              gridcolor: '#a5a5a5',
              zerolinecolor: '#000000',
              zerolinewidth: 3,
              gridwidth: 1,
              linewidth: 1,
            },
            margin: { l: 30, r: 30, t: 30, b: 30 },
            showlegend: false,
            dragmode: 'pan',
          }}
          config={{
            scrollZoom: true,
            displayModeBar: false,
          }}
          onRelayout={(layout) => {
            if (layout['xaxis.range[0]'] !== undefined) {
              setRange([layout['xaxis.range[0]'], layout['xaxis.range[1]']]);
            }
          }}
        />
      </div>
      <div className="sidebar">
        <button onClick={saveGraphAsImage} className="save-button">Guardar</button>
        {equations.map((eq) => (
          <div key={eq.id} className="equation-entry">
            <div 
              className="color-indicator" 
              style={{ backgroundColor: eq.color }} 
              onClick={() => handleColorChange(eq.id)} // Cambia el color al hacer clic
            ></div>
            <input
              type="text"
              value={eq.text}
              onChange={(e) => handleEquationChange(eq.id, e.target.value)}
              className="equation-input"
              placeholder="Ingrese una expresión"
            />
            <button onClick={() => removeEquation(eq.id)} className="remove-button">
              <X size={18} />
            </button>
          </div>
        ))}
        <button onClick={addEquation} className="add-equation-button">
          <Plus size={18} /> Agregar elemento
        </button>
      </div>
    </div>
  );
};

export default GrapherGrades;
