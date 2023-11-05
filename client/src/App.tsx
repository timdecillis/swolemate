import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import Meal from './components/Meal';

interface MealItems {
  breakfast: string[],
  lunch: string[],
  dinner: string[]
}

function App() {

  const [mealItems, setMealItems] = useState<MealItems>({breakfast: [], lunch: [], dinner: []});

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  useEffect(() => {
    instance.get('/test')
      .then(({ data }) => setMealItems(data));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          SWOLEMATE
        </h1>
        <Meal setMealItems={setMealItems} label={"Breakfast"} foods={mealItems.breakfast}/>
        <Meal setMealItems={setMealItems} label={"Lunch"} foods={mealItems.lunch}/>
        <Meal setMealItems={setMealItems} label={"Dinner"} foods={mealItems.dinner} />
      </header>
    </div>
  );
}

export default App;