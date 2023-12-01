import React, { useState, SyntheticEvent, SetStateAction } from 'react';

import { TemplateType } from '../NewTemplate';

interface AddNameProps {
  setAddNameOpen: React.Dispatch<SetStateAction<boolean>>;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  template: TemplateType;
  editTemplateName: (name: string) => void;
  setEditorOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddName = ({ setAddNameOpen, setNewTemplateOpen, editTemplateName, setEditorOpen }: AddNameProps) => {

  const [input, setInput] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const discard = () => {
    setAddNameOpen(false);
    setNewTemplateOpen(false);
  }

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        if(!input) return setErrorOpen(true);
        editTemplateName(input);
        setAddNameOpen(false);
        setEditorOpen(true);
      }}>
        <h3>Please enter a name for the template:</h3>
        <input onClick={() => setErrorOpen(false)} onChange={e => setInput(e.target.value)} type='text'></input>
        <input type='submit' value='Save'></input>
      </form>
      {errorOpen && <div>Please enter a name for your template!</div>}
      <button onClick={discard} >Discard</button>
      <h1> </h1>
    </>
  )
}

export default AddName