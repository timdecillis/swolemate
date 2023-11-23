import React, { useState, SyntheticEvent, SetStateAction } from 'react';


interface EditVariablesProps {
  editVariablesOpen: boolean;
  setEditVariablesOpen: React.Dispatch<SetStateAction<boolean>>;
  editTemplateVariable: (name: string, content: string) => void;
}

const EditVariables = ({ editVariablesOpen, setEditVariablesOpen, editTemplateVariable }: EditVariablesProps) => {

  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        editTemplateVariable(variableName, variableContent);
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