import React from 'react';

interface EditFormProps {
  editOpen: boolean;
  template: string;
}

const EditForm = ({ editOpen, template }: EditFormProps) => {

  if (!editOpen) return null

  return (
    <div>
      <h3>Please edit your template</h3>
      <form>
        <input type='text' value={template}/>
        <input type='submit' value='Save' />
      </form>
    </div>
  )
}

export default EditForm