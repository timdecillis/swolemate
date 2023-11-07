import React, { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './assets/4.png'
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
    instance.get('/default')
      .then(({data}) => {
        console.log(data)
      })
      // .then(({ data }) => setMealItems(data));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      <div>
      <img src={logo}  alt="Logo" />
    </div>
        <Meal setMealItems={setMealItems} label={"Breakfast"} foods={mealItems.breakfast}/>
        <Meal setMealItems={setMealItems} label={"Lunch"} foods={mealItems.lunch}/>
        <Meal setMealItems={setMealItems} label={"Dinner"} foods={mealItems.dinner} />
      </header>
    </div>
  );
}

export default App;