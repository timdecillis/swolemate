import React, { SyntheticEvent, useState } from 'react';

interface MealProps {
  label: string;
  foods: string[];
}

const Meal = ({ label, foods }: MealProps) => {

  const [input, setInput] = useState('');

  // const onSubmit = (event: SyntheticEvent) => {
  //   event.preventDefault()
  //   setMealItems([...mealItems, input]);

  //   return instance.get('/test')
  //   .then(({data}) => console.log('data', data));
  // }

  return (
    <>
      <div>{label}</div>
      <div>
        {foods && foods.map((item, i) => <div key={i}>{item}</div>)}
      </div>
      <form>
        <label htmlFor="new-item">Add a new {label} item: </label><br/>
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!"/>
      </form>
    </>
  )
}

export default Meal