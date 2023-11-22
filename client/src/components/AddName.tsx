import React, { useState, SyntheticEvent, SetStateAction } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

interface AddNameProps {
  user: string;
  setAddNameOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddName = ({ setAddNameOpen }: AddNameProps) => {

  const [input, setInput] = useState<string>('');

  const saveName = (name: string) => {

  }

  return (
    <>
    <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        saveName(input);
      }}>
        <h3>Please enter a name for the template:</h3>
        <input onChange={e => setInput(e.target.value)} type='text'></input>
        <input type='submit' value='Save'></input>
      </form>
      <h1> </h1>
    </>
  )
}

export default AddName