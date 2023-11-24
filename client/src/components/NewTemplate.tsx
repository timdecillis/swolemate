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
  renderString: () => any;
}

const NewTemplate = ({ user, setNewTemplateOpen, newTemplateOpen }: NewTemplateProps) => {

  const renderString = function (this: TemplateType) {
    return this.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return (
          <>
            <div>{this.variables[part[0]]}</div>
            <button>Edit</button>
          </>
        )
      }
      return (
        <div>{part}</div>
      )
    });
  }

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

  const addNewVariable = (name: string, content: string) => {
    let previousVariables = template.variables;
    let previousString = template.string;
    previousVariables[name] = content;
    setTemplate({ ...template, string: [...previousString, [name]], variables: previousVariables })
    console.log(template.variables)
  }

  return (
    <>
      {!addNameOpen ?
        <>
          <div>Template name: {template.name}</div>
          <button onClick={() => {
            setAddNameOpen(true);
            setEditorOpen(false)
          }}>Edit</button>
        </> :
        <AddName setEditorOpen={setEditorOpen} editTemplateName={editTemplateName} template={template} setNewTemplateOpen={setNewTemplateOpen} setAddNameOpen={setAddNameOpen} />

      }

      {template.string.length > 0 && <div>Template content: {
        template.renderString()
      }</div>}
      {template.variables && Object.keys(template.variables).map((key, i) => <div key={i} >{key}</div>)}
      {editorOpen && <TemplateEditor editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} addNewVariable={addNewVariable} />}

    </>
  )
}

export default NewTemplate