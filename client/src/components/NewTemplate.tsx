import React, { SetStateAction }  from 'react';

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NewTemplate = ({ user, setNewTemplateOpen }: NewTemplateProps) => {

  return (
    <>
      <button onClick={() => setNewTemplateOpen(false)} >Discard</button>
      <button>Save</button>
    </>
  )
}

export default NewTemplate