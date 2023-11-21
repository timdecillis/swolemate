import React, { useState, SetStateAction } from 'react';

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NewTemplate = ({ user, setNewTemplateOpen }: NewTemplateProps) => {

  const [variableOpen, setVariableOpen] = useState<boolean>(false);
  const [template, setTemplate] = useState({});

  return (
    <>
    <form>
      <h3>Please enter a name for the template</h3>
      <input type='text'></input>
      <input type='submit' value='Save'></input>
    </form>
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

export default NewTemplate