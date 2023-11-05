import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface MealProps {
  label: string;
  foods: string[];
}

const Meal = ({ label, foods }: MealProps) => {

  const lower = function (word: string): string {
    let newWord = word[0].toLowerCase();
    for (let i = 1; i < word.length; i ++) {
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
   console.log(lowerLabel)

    instance.post('/addFood', { input, lowerLabel });
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