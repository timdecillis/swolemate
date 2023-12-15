import React, { useState, SetStateAction, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { renderString } from '../Utilities/helpers';
import { getUser } from './userSlice'
import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';

interface TemplateEditorProps {
  existingTemplate?: TemplateType;
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

const TemplateEditor = ({ existingTemplate }: TemplateEditorProps) => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [addNameOpen, setAddNameOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);
  const [template, setTemplate] = useState<TemplateType>(existingTemplate ? existingTemplate : { id: 0, name: '', variables: {}, string: [] });

  if(existingTemplate) {
    setAddNameOpen(false);
    setPaletteOpen(true);
  }

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

  // const saveNewTemplate = () => {
  //   instance.post('/addTemplate', { user, template })
  //     .then(({ data }) => {
  //       setTemplates(data);
  //       setNewTemplateOpen(false);
  //     })
  // }

  if (addNameOpen) {
    return <AddName setAddNameOpen={setAddNameOpen} setPaletteOpen={setPaletteOpen} editTemplateName={editTemplateName} template={template}/>
  }

  return (
    <>
      <>
        <h3>Name: {template.name}</h3>
        <button onClick={() => {
          setAddNameOpen(true)
        }}>Edit Name</button>
      </>
      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}

      {/* {editorOpen && <EditorPalette saveNewTemplate={saveNewTemplate} setTemplate={setTemplate} addExistingVariableToString={addExistingVariableToString} editTemplateString={editTemplateString} template={template} addNewVariable={addNewVariable} />} */}
    </>
  )
}

export default TemplateEditor