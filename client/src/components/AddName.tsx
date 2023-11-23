import React, { useState, SyntheticEvent, SetStateAction } from 'react';
import axios from 'axios';

import { TemplateType } from './NewTemplate';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});


interface AddNameProps {
  setAddNameOpen: React.Dispatch<SetStateAction<boolean>>;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  template: TemplateType;
  editTemplateName: (name: string) => void;
  setEditorOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddName = ({ setAddNameOpen, setNewTemplateOpen, editTemplateName, setEditorOpen }: AddNameProps) => {

  const [input, setInput] = useState<string>('');

  const discard = () => {
    setAddNameOpen(false);
    setNewTemplateOpen(false);
  }

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        editTemplateName(input);
        setAddNameOpen(false);
        setEditorOpen(true);
      }}>
        <h3>Please enter a name for the template:</h3>
        <input onChange={e => setInput(e.target.value)} type='text'></input>
        <input type='submit' value='Save'></input>
      </form>
      <button onClick={discard} >Discard</button>
      <h1> </h1>
    </>
  )
}

export default AddName