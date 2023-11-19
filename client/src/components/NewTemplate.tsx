import React, { useState, SetStateAction } from 'react';

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NewTemplate = ({ user, setNewTemplateOpen }: NewTemplateProps) => {

  const [variableOpen, setVariableOpen] = useState<boolean>(false);

  return (
    <>
      <h2> </h2>
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