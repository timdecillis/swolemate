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
  variables: {[key: string]: string};
  string: string;
}

const NewTemplate = ({ user, setNewTemplateOpen, newTemplateOpen }: NewTemplateProps) => {

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: {}, string: '' });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const editTemplateName = (name: string) => {
    setTemplate({ ...template, name });
  }

  const editTemplateString = (string: string) => {
    setTemplate({...template, string});
  }

  const editTemplateVariable = (name: string, content: string) => {
    let previousVariables = template.variables;
    previousVariables[name] = content;
    setTemplate({...template, variables: previousVariables })
  }

  return (
    <>
      {template.name &&
        <>
          <div>Template name: {template.name}</div>
          <button onClick={() => {
            setAddNameOpen(true);
            setEditorOpen(false)
          }}>Edit</button>
        </>
      }
      {template.string && <div>Template content: {template.string}</div>}
      {template.variables && Object.keys(template.variables).map(key => <div>{key}</div>)}
      {addNameOpen && <AddName setEditorOpen={setEditorOpen} editTemplateName={editTemplateName} template={template} setNewTemplateOpen={setNewTemplateOpen} setAddNameOpen={setAddNameOpen} />}
      {editorOpen && <TemplateEditor editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} editTemplateVariable={editTemplateVariable} />}

    </>
  )
}

export default NewTemplate