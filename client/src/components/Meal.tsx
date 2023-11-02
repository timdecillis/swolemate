import React from 'react';

interface MealProps {
  label: string;
}

const Meal = ({ label }: MealProps ) => {
  return (
    <>
      <div>{label}</div>
      <input></input>
    </>
  )
}

export default Meal