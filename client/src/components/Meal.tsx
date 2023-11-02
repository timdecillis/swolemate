import React, { useState } from 'react';

interface MealProps {
  label: string;
}

const Meal = ({ label }: MealProps ) => {

  const [mealItems, setMealItems] = useState(['cheese', 'soda']);

  return (
    <>
      <div>{label}</div>
      <div>
        {mealItems.map(item => <div>{item}</div>)}
      </div>
      <input></input>
    </>
  )
}

export default Meal