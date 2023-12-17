import React, { useState, SyntheticEvent, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { editVariable } from './newTemplateSlice';

interface EditVariableProps {
  setEditVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  variable: string[];
}

const EditVariable = ({ setEditVariableOpen, variable }: EditVariableProps) => {

  const dispatch = useDispatch();
  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        let prevName = '';
        let name = '';
        let content = '';
        if (!variableContent) {
          prevName = variable[0];
        }
        if (!variableName) {
          name = variable[0];
        } else {
          name = variableName;
        }
        if (!variableContent) {
          content = variable[1];
        } else {
          content = variableContent;
        }
        dispatch(editVariable({prevName, name, content}));
        setEditVariableOpen(false);
      }}>

        <input onChange={(e) => setVariableName(e.target.value)} type='text' defaultValue={variable[0]}></input>
        <input onChange={(e) => setVariableContent(e.target.value)} type='text' defaultValue={variable[1]}></input>
        <button type='submit'>Save</button>
      </form>
      <button onClick={() => setEditVariableOpen(false)} >Cancel</button>
    </>
  )
}

export default EditVariable