import React, { useState, SetStateAction, useEffect } from 'react';

import AddName from './AddName';
import TemplateEditor from './TemplateEditor';
import EditVariable from './EditVariable';

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

const NewTemplate = ({ setNewTemplateOpen }: NewTemplateProps) => {

  const renderString = function (this: TemplateType) {
    return this.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return this.variables[part[0]];
      }
      return part;
    }).join(' ');
  }

  const [template, setTemplate] = useState<TemplateType>({ id: 0, name: '', variables: {}, string: [], renderString: renderString });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [editVariableOpen, setEditVariableOpen] = useState<boolean>(false);
  const [variable, setVariable] = useState<string[]>([]);

  useEffect(() => {

  })

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

  const editVariable = (name: string, content: string) => {
    console.log('content in function:', content)
    setTemplate(prevTemplate => ({
      ...prevTemplate, variables: {...prevTemplate.variables, [name]: content}
    }));
  }

  let variables = Object.entries(template.variables).map((entry, i) => {
    return (
      <>
        <div key={i}>Name: {entry[0]}</div>
        <div key={i}>Content: {entry[1]}</div>
        <button onClick={() => {
          setEditVariableOpen(true);
          setVariable(entry);
          }} key={i}>Edit</button>
      </>
    )
  });

  return (
    <>
      {!addNameOpen ?
        <>
          <h3>Template name: {template.name}</h3>
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
      <h3>Variables</h3>
      {variables}
      {editVariableOpen && <EditVariable editVariable={editVariable} variable={variable} editVariableOpen={editVariableOpen} setEditVariableOpen={setEditVariableOpen} />}
      {editorOpen && <TemplateEditor addExistingVariableToString={addExistingVariableToString} editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} addNewVariable={addNewVariable} />}

    </>
  )
}

export default NewTemplate