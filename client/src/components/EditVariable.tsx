import React, { useState, SyntheticEvent, SetStateAction } from 'react';


interface EditVariableProps {
  editVariableOpen: boolean;
  setEditVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  variable: string[];
  editVariable: (name: string, content: string) => void;
}

const EditVariable = ({ editVariableOpen, setEditVariableOpen, variable, editVariable }: EditVariableProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        editVariable(variableName || variable[0], variableContent || variable[1]);
        setEditVariableOpen(false);
      }} >
        <input onChange={(e) => setVariableName(e.target.value)} type='text' defaultValue={variable[0]}></input>
        <input onChange={(e) => setVariableContent(e.target.value)} type='text' defaultValue={variable[1]}></input>
        <button type='submit'>Save</button>
      </form>
      <button onClick={() => setEditVariableOpen(false)} >Cancel</button>
    </>
  )
}

export default EditVariable