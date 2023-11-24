import React, { useState, SyntheticEvent, SetStateAction } from 'react';


interface EditVariableProps {
  setVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  addNewVariable: (name: string, content: string) => void;
}

const AddVariable = ({ addNewVariable, setVariableOpen }: EditVariableProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <input onChange={(e) => setVariableName(e.target.value)} placeholder='Variable name' ></input>
      <input onChange={(e) => setVariableContent(e.target.value)} placeholder='Variable content' ></input>
      <button onClick={() => setVariableOpen(false)} >Discard</button>
      <button onClick={() => {
        addNewVariable(variableName, variableContent);
        setVariableOpen(false);
      }} >Add to template</button>
    </>
  )
}

export default AddVariable