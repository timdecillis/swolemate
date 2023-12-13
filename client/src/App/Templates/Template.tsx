import React, { useState, Dispatch, SetStateAction } from 'react';

import EditForm from './EditForm';
import TemplateEditor from './TemplateEditor';
import { TemplateType } from './TemplateEditor';

interface TemplateProps {
  index: number;
  string: string;
  deleteTemplate: (id: string) => void;
  updateTemplate: (oldValue: string, newValue: string) => void;
  template: TemplateType;
  setTemplates: Dispatch<SetStateAction<[]>>;
  user: string | undefined;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
  newTemplateOpen: boolean;
}

const Template = ({ newTemplateOpen, index, updateTemplate, deleteTemplate, template, string, setTemplates, user, setNewTemplateOpen }: TemplateProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [copiedOpen, setCopiedOpen] = useState<boolean>(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOpen(true);
    setTimeout(() => {
      setCopiedOpen(false);
    }, 1800)
  }

  const deleteAlert = () => {
    const result = window.confirm('Are you sure you want to permanently delete this template?');
    if (result) deleteTemplate(template.id.toString());
  }

  if (editOpen) {
    return <TemplateEditor currentTemplate={template} setTemplates={setTemplates} setNewTemplateOpen={setNewTemplateOpen} newTemplateOpen={newTemplateOpen} />
  } else {
    return (
      <div>
        <h3>{index + 1}.) {template.name}</h3>
        <h4>{string}</h4>
        {copiedOpen && <div>template copied to clipboard</div>}
        <button onClick={() => copy(string)} >Copy</button>
        <button onClick={() => {
          setEditOpen(true);
        }
        } >Edit</button>
        <button onClick={deleteAlert} >X</button>
      </div>
    )
  }
}

export default Template