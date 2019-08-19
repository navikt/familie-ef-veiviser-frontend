import React, { useState } from 'react';
import './App.scss';
import Sporsmal from './Sporsmal';

const App = () => {
  return (
    <div className="App">
      <div className="question-container">
          <Sporsmal />
      </div>
    </div>
  );
};

export default App;
