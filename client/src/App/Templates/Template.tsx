import React, { useState } from 'react';

import EditForm from './EditForm';

interface TemplateProps {
  key: number;
  deleteTemplate: (value: string) => void;
  updateTemplate: (oldValue: string, newValue: string) => void;
  templateName: string;
}

const Template = ({ key, updateTemplate, deleteTemplate, templateName }: TemplateProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);

  if (editOpen) {
    return <EditForm setEditOpen={setEditOpen} editOpen={editOpen} updateTemplate={updateTemplate} />
  } else {
    return (
      <div key={key}>
        <h3>{key + 1}.) {templateName}</h3>
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