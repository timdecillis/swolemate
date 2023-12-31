import React, { SetStateAction, SyntheticEvent, useState } from 'react';

interface EditFormProps {
  editOpen: boolean;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
  updateTemplate: (oldValue: string, newValue: string) => void;
}

const EditForm = ({ updateTemplate, setEditOpen }: EditFormProps) => {

  // const [input, setInput] = useState<string>(template);
  const [variableOpen, setVariableOpen] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    // updateTemplate(template, input)
    setEditOpen(false)
  }

  const addVariable = () => {
    setVariableOpen(true);
  }

  return (
    <div>
      <h3>Please edit your template</h3>
      <form onSubmit={onSubmit} >
        {/* <input onChange={e => setInput(e.target.value)} type='text' value={input} /> */}
        <input type='submit' value='Save' />
        {variableOpen &&
        <div>
          <h3>Enter variable name</h3>
          <input></input>
          </div>
          }
      </form>
      <button onClick={addVariable} >Enter variable</button>
    </div>
  )
}

export default EditForm