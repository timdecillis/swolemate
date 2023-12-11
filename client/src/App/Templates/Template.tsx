import React, { useState, Dispatch, SetStateAction } from 'react';

import EditForm from './EditForm';
import NewTemplate from './NewTemplate';
import { TemplateType } from './NewTemplate';

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

  if (editOpen) {
    return <NewTemplate setTemplates={setTemplates} setNewTemplateOpen={setNewTemplateOpen} newTemplateOpen={newTemplateOpen} />
  } else {
    return (
      <div>
        <h3>{index + 1}.) {template.name}</h3>
        <h4>{string}</h4>
        {copiedOpen && <div>template copied to clipboard</div>}
        <button onClick={() => copy(string)} >Copy</button>
        <button onClick={() => setEditOpen(true)} >Edit</button>
        <button onClick={() => {
          deleteTemplate(template.id.toString());
        }} >X</button>
      </div>
    )
  }
}

export default Template