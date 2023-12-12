import React, { useState, SetStateAction, Dispatch } from 'react';
import axios from 'axios';

import AddName from './NewTemplate/AddName';
import TemplateEditor from './NewTemplate/EditorPalette';

interface TemplateEditorProps {
  user?: string;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  newTemplateOpen: boolean;
  setTemplates: Dispatch<SetStateAction<[]>>;
  addNameOpen?: boolean;
  setAddNameOpen?: React.Dispatch<SetStateAction<boolean>>;
}

export type TemplateType = {
  id: number;
  name: string;
  variables: { [key: string]: string };
  string: (string | string[])[];
}

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

const NewTemplate = ({ addNameOpen, setAddNameOpen, setNewTemplateOpen, user, setTemplates }: TemplateEditorProps) => {

  const renderString = function (template: TemplateType) {
    return template.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return template.variables[part[0]];
      }
      return part;
    }).join(' ');
  }

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: {}, string: [] });
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
  }

  const addExistingVariableToString = (name: string) => {
    let previousString = template.string;
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      string: [...previousString, [name]]
    }));
  }

  const saveNewTemplate = () => {
    instance.post('/addTemplate', {user, template})
    .then(({data}) => {
      setTemplates(data);
      setNewTemplateOpen(false);
    })
  }

  return (
    <>
      {!addNameOpen ?
        <>
          <h3>Template name: {template.name}</h3>
          <button onClick={() => {
            setAddNameOpen?.(true);
            setEditorOpen(false)
          }}>Edit Name</button>
        </> :
        <AddName setEditorOpen={setEditorOpen} editTemplateName={editTemplateName} template={template} setNewTemplateOpen={setNewTemplateOpen} setAddNameOpen={setAddNameOpen} />
      }

      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}

      {editorOpen && <TemplateEditor saveNewTemplate={saveNewTemplate} setTemplate={setTemplate} addExistingVariableToString={addExistingVariableToString} editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} addNewVariable={addNewVariable} />}
    </>
  )
}

export default NewTemplate