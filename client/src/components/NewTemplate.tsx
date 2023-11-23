import React, { useState, SetStateAction } from 'react';
import axios from 'axios';

import AddName from './AddName';
import TemplateEditor from './TemplateEditor';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  newTemplateOpen: boolean;
}

export type TemplateType = {
  id: number;
  name: string;
  variables: [{
    name: string,
    content: string
  }];
  string: string;
}

const NewTemplate = ({ user, setNewTemplateOpen, newTemplateOpen }: NewTemplateProps) => {

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: [{ name: '', content: '' }], string: '' });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  return (
    <>
      {template.name && <div>{template.name}</div>}
      {addNameOpen && <AddName template={template} setNewTemplateOpen={setNewTemplateOpen} setAddNameOpen={setAddNameOpen}/>}
      {editorOpen && <TemplateEditor template={template} setNewTemplateOpen={setNewTemplateOpen} />}

    </>
  )
}

export default NewTemplate