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
  variables: { [key: string]: string };
  string: (string | string[])[];
  renderString: () => string;
}

const renderString = function(this: TemplateType) {
  return this.string.map((part: (string | string[])) => {
    if (Array.isArray(part)) {
      return this.variables[part[0]];
    }
    return part;
  }).join(' ');
}

const NewTemplate = ({ user, setNewTemplateOpen, newTemplateOpen }: NewTemplateProps) => {

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: {}, string: [], renderString: renderString });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const editTemplateName = (name: string) => {
    setTemplate({ ...template, name });
  }

  const editTemplateString = (string: string) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      string: [...prevTemplate.string, string]
    }));
  };

  const editTemplateVariable = (name: string, content: string) => {
    let previousVariables = template.variables;
    let previousString = template.string;
    previousVariables[name] = content;
    setTemplate({ ...template, string: [...previousString, [name]], variables: previousVariables })
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
      {template.string.length > 0 && <div>Template content: {template.renderString()}</div>}
      {template.variables && Object.keys(template.variables).map(key => <div>{key}</div>)}
      {addNameOpen && <AddName setEditorOpen={setEditorOpen} editTemplateName={editTemplateName} template={template} setNewTemplateOpen={setNewTemplateOpen} setAddNameOpen={setAddNameOpen} />}
      {editorOpen && <TemplateEditor editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} editTemplateVariable={editTemplateVariable} />}

    </>
  )
}

export default NewTemplate