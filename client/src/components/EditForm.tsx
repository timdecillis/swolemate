import React from 'react';

interface EditFormProps {
  editOpen: boolean;
}

const EditForm = ({ editOpen }: EditFormProps) => {

  if(!editOpen) return null

  return (
    <div>

  </div>
  )
}

export default EditForm