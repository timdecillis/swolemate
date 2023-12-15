import React, { useState, SetStateAction, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { getUser } from './userSlice'
import { setAddNameOpen } from './Templates/templatesSlice'
import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';

interface TemplateEditorProps {
  user?: string
  currentTemplate?: TemplateType;
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

const TemplateEditor = ({ currentTemplate }: TemplateEditorProps) => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  // const nameOpen = useSelector(addNameOpen);

  const renderString = function (template: TemplateType) {
    return template.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return template.variables[part[0]];
      }
      return part;
    }).join(' ');
  }

  const [template, setTemplate] = useState<TemplateType>(
    currentTemplate ? currentTemplate : { id: 0, name: '', variables: {}, string: [] }
  );
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
    instance.post('/addTemplate', { user, template })
      .then(({ data }) => {
        // setTemplates(data);
        // setNewTemplateOpen(false);
      })
  }

  // if (nameOpen) {
  //   return <AddName setEditorOpen={setEditorOpen} editTemplateName={editTemplateName} template={template}/>
  // }

  return (
    <>
      <>
        <h3>Name: {template.name}</h3>
        <button onClick={() => {
          dispatch(setAddNameOpen({ condition: true }))
          setEditorOpen(false)
        }}>Edit Name</button>
      </>
      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}

      {editorOpen && <EditorPalette saveNewTemplate={saveNewTemplate} setTemplate={setTemplate} addExistingVariableToString={addExistingVariableToString} editTemplateString={editTemplateString} template={template} addNewVariable={addNewVariable} />}
    </>
  )
}

export default TemplateEditor