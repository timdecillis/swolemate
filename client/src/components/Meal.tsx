import React, { SyntheticEvent, useState } from 'react';

interface MealProps {
  label: string;
}

const Meal = ({ label }: MealProps) => {

  const [mealItems, setMealItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    setMealItems([...mealItems, input]);
  }

  return (
    <>
      <div>{label}</div>
      <div>
        {mealItems.map(item => <div>{item}</div>)}
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