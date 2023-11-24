import React, { useState, SyntheticEvent, SetStateAction } from 'react';

import { TemplateType } from './NewTemplate';

interface EditVariableProps {
  setVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  addNewVariable: (name: string, content: string) => void;
  template: TemplateType;
}

const AddVariable = ({ addNewVariable, setVariableOpen, template }: EditVariableProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      {Object.keys(template.variables) && (
        <>
          <h4>Choose a variable: </h4>
          {Object.entries(template.variables).map((tuple, i) => {
            return (
              <>
                <div>Name: {tuple[0]} Content: {tuple[1]}</div>
                <button>Insert</button>
              </>
            );
          })}
          <h4>Or create a new variable:</h4>
        </>
      )}
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