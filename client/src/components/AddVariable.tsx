import React, { useState, SetStateAction } from 'react';

import { TemplateType } from './NewTemplate';

interface EditVariableProps {
  setVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  addNewVariable: (name: string, content: string) => void;
  template: TemplateType;
  addExistingVariableToString: (name: string) => void;
}

const AddVariable = ({ addNewVariable, setVariableOpen, template, addExistingVariableToString }: EditVariableProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  return (
    <>
      {Object.keys(template.variables).length > 0 && (
        <>
          <h4>Choose a variable: </h4>
          {Object.entries(template.variables).map((tuple, i) => {
            return (
              <>
                <div>Name: {tuple[0]} Content: {tuple[1]}</div>
                <button onClick={() => {
                  addExistingVariableToString(tuple[0]);
                  setVariableOpen(false);
                  }} >Insert</button>
              </>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
      <h4>Create a new variable:</h4>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => {setVariableName(e.target.value)}} placeholder='Variable name' ></input>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => setVariableContent(e.target.value)} placeholder='Variable content' ></input>
      {errorOpen && <div>Please enter a variable name and content!</div>}
      <button onClick={() => setVariableOpen(false)} >Discard</button>
      <button onClick={() => {
        if (!variableName || !variableContent) return setErrorOpen(true);
        addNewVariable(variableName, variableContent);
        setVariableOpen(false);
      }} >Add to template</button>
    </>
  )
}

export default AddVariable