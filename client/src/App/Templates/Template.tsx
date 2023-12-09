import React, { useState } from 'react';

import EditForm from './EditForm';
import { TemplateType } from './NewTemplate';

interface TemplateProps {
  index: number;
  deleteTemplate: (value: string) => void;
  updateTemplate: (oldValue: string, newValue: string) => void;
  template: TemplateType;
}

const Template = ({ index, updateTemplate, deleteTemplate, template }: TemplateProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [copiedOpen, setCopiedOpen] = useState<boolean>(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOpen(true);
    setTimeout(()=> {
      setCopiedOpen(false);
    }, 1800)
  }

  if (editOpen) {
    return <EditForm setEditOpen={setEditOpen} editOpen={editOpen} updateTemplate={updateTemplate} />
  } else {
    return (
      <div key={index}>
        <h3>{index + 1}.) {template.name}</h3>
        {copiedOpen && <div>template copied to clipboard</div>}
        <button onClick={() => copy(template.name) } >Copy</button>
        <button onClick={() => setEditOpen(true)} >Edit</button>
        <button onClick={() => {
          // deleteTemplate(template)
        }} >X</button>
      </div>
    )
  }
}

export default Template