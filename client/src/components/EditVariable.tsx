import React, { useState, SyntheticEvent, SetStateAction } from 'react';


interface EditVariableProps {
  editVariableOpen: boolean;
  setEditVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  variable: string[];
}

const EditVariable = ({ editVariableOpen, setEditVariableOpen, variable }: EditVariableProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }} >
        <input onChange={(e) => setVariableName(e.target.value)} type='text' value={variable[0]}></input>
        <input onChange={(e) => setVariableContent(e.target.value)} type='text' value={variable[1]}></input>
        <button type='submit'>Save</button>
      </form>
      <button onClick={() => setEditVariableOpen(false)} >Cancel</button>
    </>
  )
}

export default EditVariable