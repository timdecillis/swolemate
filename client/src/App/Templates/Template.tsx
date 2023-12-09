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

  if (editOpen) {
    return <EditForm setEditOpen={setEditOpen} editOpen={editOpen} updateTemplate={updateTemplate} />
  } else {
    return (
      <div key={index}>
        <h3>{index + 1}.) {template.name}</h3>
        <button onClick={() => navigator.clipboard.writeText('template text to copy')} >Copy</button>
        <button onClick={() => setEditOpen(true)} >Edit</button>
        <button onClick={() => {
          // deleteTemplate(template)
        }} >X</button>
      </div>
    )
  }
}

export default Template