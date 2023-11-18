import React  from 'react';

interface NewTemplateProps {
  user: string;
}

const NewTemplate = ({ user }: NewTemplateProps) => {

  return (
    <>
      <button>Discard</button>
      <button>Save</button>
    </>
  )
}

export default NewTemplate