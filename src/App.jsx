import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { MainContent } from './components/main_content';
import { generateShades, shadeSteps } from './utils.js';
import './App.css';

export const App = () => {
  const [primaryColor, setPrimaryColor] = useState('#b19496');
  const [secondaryColor, setSecondaryColor] = useState('#aeee3f'); // Placeholder for secondary
  const [primaryPaletteName, setPrimaryPaletteName] = useState('Primary');
  const [secondaryPaletteName, setSecondaryPaletteName] = useState('Secondary');
  const [primaryShades, setPrimaryShades] = useState({});
  const [secondaryShades, setSecondaryShades] = useState({});

  useEffect(() => {
    setPrimaryShades(generateShades(primaryColor));
    setSecondaryShades(generateShades(secondaryColor));
  }, [primaryColor, secondaryColor]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          primaryPaletteName={primaryPaletteName}
          setPrimaryPaletteName={setPrimaryPaletteName}
          secondaryPaletteName={secondaryPaletteName}
          setSecondaryPaletteName={setSecondaryPaletteName}
        />
        {Object.keys(primaryShades).length > 0 && Object.keys(secondaryShades).length > 0 ? (
          <MainContent
            primaryShades={primaryShades}
            secondaryShades={secondaryShades}
            primaryPaletteName={primaryPaletteName}
            secondaryPaletteName={secondaryPaletteName}
            shadeSteps={shadeSteps}
          />
        ) : (
          <div className="loading-message">Loading color palettes...</div>
        )}
      </div>
    </div>
  );
};
