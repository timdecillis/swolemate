import React, { SetStateAction, SyntheticEvent, useState } from 'react';

interface EditFormProps {
  editOpen: boolean;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
  template: string;
  updateTemplate: (oldValue: string, newValue: string) => void;
}

const EditForm = ({ template, updateTemplate, setEditOpen }: EditFormProps) => {

  const [input, setInput] = useState<string>(template)

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    updateTemplate(template, input)
    setEditOpen(false)
  }

  return (
    <div>
      <h3>Please edit your template</h3>
      <form onSubmit={onSubmit} >
        <input onChange={e => setInput(e.target.value)} type='text' value={input}/>
        <input type='submit' value='Save' />
      </form>
      <button>Enter variable</button>
    </div>
  )
}

export default EditForm