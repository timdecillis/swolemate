import React, { useState, SetStateAction, SyntheticEvent } from 'react';

import AddName from './AddName';
import TemplateEditor from './TemplateEditor';

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

type TemplateType = {
  id: number;
  name: string;
  variables: [{
    name: string,
    content: string
  }];
  string: string;
}

const NewTemplate = ({ user, setNewTemplateOpen }: NewTemplateProps) => {

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: [{name: '', content: ''}], string: '' });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);


  return (
    <>
      {addNameOpen && <AddName setAddNameOpen={setAddNameOpen} />}
      {editorOpen && <TemplateEditor template={template} setNewTemplateOpen={setNewTemplateOpen} />}

    </>
  )
}

export default NewTemplate