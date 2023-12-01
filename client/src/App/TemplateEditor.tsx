import React, { useState, SetStateAction, SyntheticEvent } from 'react';

import { TemplateType } from './Templates/NewTemplate';
import AddVariable from './AddVariable';

interface TemplateEditorProps {
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  template: TemplateType;
  editTemplateString: (string: string) => void;
  addNewVariable: (name: string, content: string) => void;
  addExistingVariableToString: (name: string) => void;
}

const TemplateEditor = ({ setNewTemplateOpen, template, editTemplateString, addNewVariable, addExistingVariableToString }: TemplateEditorProps) => {

  const [variableOpen, setVariableOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  return (
    <>
      <h4>Enter text: </h4>
      <form onClick={() => setErrorOpen(false)} onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        if (!input) setErrorOpen(true);
        editTemplateString(input);
        setInput('');
      }} >
        <input value={input} onChange={e => setInput(e.target.value)} type='text' ></input>
        <button type='submit'>Add to template</button>
      </form>
      {errorOpen && <div>Please enter some text to add!</div>}
      <h4> </h4>
      {variableOpen && <AddVariable addExistingVariableToString={addExistingVariableToString} template={template} setVariableOpen={setVariableOpen} addNewVariable={addNewVariable}/>}
      <button onClick={() => setVariableOpen(true)} >Insert variable</button>
      <button onClick={() => setNewTemplateOpen(false)} >Discard Template</button>
      <button>Save</button>
      <h2> </h2>
    </>
  )
}

export default TemplateEditor