import React, { useState, SetStateAction, SyntheticEvent } from 'react';
import axios from 'axios';

import { TemplateType } from './NewTemplate';
import EditVariable from './EditVariable';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

interface TemplateEditorProps {
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  template: TemplateType;
  editTemplateString: (string: string) => void;
  addNewVariable: (name: string, content: string) => void;

}

const TemplateEditor = ({ setNewTemplateOpen, template, editTemplateString, addNewVariable }: TemplateEditorProps) => {

  const [variableOpen, setVariableOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [variableName, setVariableName] = useState<string>('');
  const [variableContent, setVariableContent] = useState<string>('');


  return (
    <>
      <h4>Enter text: </h4>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        editTemplateString(input);
        setInput('');
      }} >
        <input value={input} onChange={e => setInput(e.target.value)} type='text' ></input>
        <button type='submit'>Add to template</button>
      </form>
      <h4> </h4>
      {variableOpen &&
        <div>
          <input onChange={(e) => setVariableName(e.target.value)} placeholder='Variable name' ></input>
          <input onChange={(e) => setVariableContent(e.target.value)} placeholder='Variable content' ></input>
          <button onClick={() => setVariableOpen(false)} >Discard</button>
          <button onClick={() => {
            addNewVariable(variableName, variableContent);
            setVariableOpen(false);
          }} >Add to template</button>
        </div>
      }
      <button onClick={() => setVariableOpen(true)} >Insert variable</button>
      <button onClick={() => setNewTemplateOpen(false)} >Discard</button>
      <button>Save</button>
      <h2> </h2>
    </>
  )
}

export default TemplateEditor