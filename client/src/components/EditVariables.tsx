import React, { useState, SyntheticEvent, SetStateAction } from 'react';


interface EditVariablesProps {
  editVariablesOpen: boolean;
  setEditVariablesOpen: React.Dispatch<SetStateAction<boolean>>;

}

const EditVariables = ({ editVariablesOpen, setEditVariablesOpen }: EditVariablesProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }} >
        <input onChange={(e) => setVariableName(e.target.value)} type='text' placeholder='name'></input>
        <input onChange={(e) => setVariableContent(e.target.value)} type='text' placeholder='content'></input>
        <button type='submit'>Save</button>
      </form>
      <button onClick={() => setEditVariablesOpen(false)} >Cancel</button>
    </>
  )
}

export default EditVariables