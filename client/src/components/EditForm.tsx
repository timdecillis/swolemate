import React, { SyntheticEvent, useState } from 'react';

interface EditFormProps {
  editOpen: boolean;
  template: string;
  updateTemplate: (oldValue: string, newValue: string) => void;
}

const EditForm = ({ editOpen, template, updateTemplate }: EditFormProps) => {

  const [input, setInput] = useState<string>('')

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    updateTemplate(template, input)
  }

  return (
    <div>
      <h3>Please edit your template</h3>
      <form onSubmit={onSubmit} >
        <input onChange={e => setInput(e.target.value)} type='text' value={template}/>
        <input type='submit' value='Save' />
      </form>
    </div>
  )
}

export default EditForm