import React, { useState, SetStateAction } from 'react';
import axios from 'axios';

import { TemplateType } from './NewTemplate';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

interface TemplateEditorProps {
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  template: TemplateType;
}

const TemplateEditor = ({ setNewTemplateOpen, template }: TemplateEditorProps) => {

  const [variableOpen, setVariableOpen] = useState<boolean>(false);


  return (
    <>
      <h3>Enter text -</h3>
      <form>
        <input type='text' ></input>
        <button>Add to template</button>
        <button type='submit'>Finish</button>
      </form>
      <h3>or - </h3>
      {variableOpen &&
        <div>
          <input placeholder='Variable name' ></input>
          <input placeholder='Variable content' ></input>
          <button onClick={() => setVariableOpen(false)} >Discard</button>
          <button onClick={() => setVariableOpen(false)} >Save</button>
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