import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface MealItems {
  breakfast: string[],
  lunch: string[],
  dinner: string[]
}

interface MealProps {
  label: string;
  foods: string[];
  setMealItems: React.Dispatch<React.SetStateAction<MealItems>>;
}

const Meal = ({ label, foods, setMealItems }: MealProps) => {

  const lower = function (word: string): string {
    let newWord = word[0].toLowerCase();
    for (let i = 1; i < word.length; i++) {
      newWord += word[i]
    }
    return newWord;
  }

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    const lowerLabel = lower(label);
    instance.post('/addFood', { input, lowerLabel })
      .then(({data}) => {
        console.log(data)
        setMealItems(data);
      })
  }

  return (
    <>
      <div>{label}</div>
      <div>
        {foods && foods.map((item, i) => <div key={i}>{item}</div>)}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item">Add a new {label} item: </label><br />
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!" />
      </form>
    </>
  )
}

export default Meal