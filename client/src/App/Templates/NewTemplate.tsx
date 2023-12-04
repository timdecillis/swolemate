import React, { useState, SetStateAction } from 'react';

import AddName from './NewTemplate/AddName';
import TemplateEditor from './NewTemplate/TemplateEditor';
import EditVariable from './NewTemplate/EditVariable';

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

      {template.string.length > 0 && <div>Template content: {template.renderString()}</div>}

      {editorOpen && <TemplateEditor setTemplate={setTemplate} addExistingVariableToString={addExistingVariableToString} editTemplateString={editTemplateString} template={template} setNewTemplateOpen={setNewTemplateOpen} addNewVariable={addNewVariable} />}
    </>
  )
}

export default NewTemplate