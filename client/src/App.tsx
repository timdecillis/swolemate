import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

import './App.css';
import Meal from './components/Meal';

interface MealItems {
  breakfast: string[],
  lunch: string[],
  dinner: string[]
}

function App() {

  const [mealItems, setMealItems] = useState<MealItems>({ breakfast: [], lunch: [], dinner: [] });
  const [user, setUser] = useState('');

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.get('/getUserFoods', { params: { user } })
      .then(({data}) => {
        setMealItems(data)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Enter username</h3>
          <form onSubmit={onSubmit}>
            <input onChange={e => setUser(e.target.value)} type='text' />
            <input type='submit' />
          </form>
        </div>
        <Meal setMealItems={setMealItems} label={"Breakfast"} foods={mealItems.breakfast} />
        <Meal setMealItems={setMealItems} label={"Lunch"} foods={mealItems.lunch} />
        <Meal setMealItems={setMealItems} label={"Dinner"} foods={mealItems.dinner} />
      </header>
    </div>
  );
}

export default App;