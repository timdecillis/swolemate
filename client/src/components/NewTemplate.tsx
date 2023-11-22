import React, { useState, SetStateAction, SyntheticEvent } from 'react';

import AddName from './AddName';
import TemplateEditor from './TemplateEditor';

interface NewTemplateProps {
  user: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface template {
  id: number;
  name: string;
  variables: [{
    name: string,
    content: string
  }];
  string: string;

}

const NewTemplate = ({ user, setNewTemplateOpen }: NewTemplateProps) => {

  const [template, setTemplate] = useState({});
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const saveName = (name: string) => {
    setTemplate(prevTemplate => ({ ...prevTemplate, name }));
  }

  return (
    <>
      {addNameOpen && <AddName setAddNameOpen={setAddNameOpen} />}
      {editorOpen && <TemplateEditor setNewTemplateOpen={setNewTemplateOpen} />}

    </>
  )
}

export default NewTemplate