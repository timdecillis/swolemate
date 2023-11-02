import React from 'react';

import './App.css';
import Meal from './components/Meal';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          SWOLEMATE
        </h1>
        <Meal label={"Breakfast"} />
        <Meal label={"Lunch"} />
        <Meal label={"Foo"} />
      </header>
    </div>
  );
}

export default App;
