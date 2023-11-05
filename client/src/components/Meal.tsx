import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios'

interface MealProps {
  label: string;
}

const Meal = ({ label }: MealProps) => {

  const [mealItems, setMealItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const instance = axios.create({
    baseURL: 'http://localhost:5000' // Replace with your desired base URL
  });

  // Now you can use `instance` to make requests with the specified base URL


  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    setMealItems([...mealItems, input]);

    return instance.get('/test')
    .then(() => console.log('hit server'));
  }

  return (
    <>
      <div>{label}</div>
      <div>
        {mealItems.map((item, i) => <div key={i}>{item}</div>)}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item">Add a new {label} item: </label><br/>
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!"/>
      </form>
    </>
  )
}

export default Meal