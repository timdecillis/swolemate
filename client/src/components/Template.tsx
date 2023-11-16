import React, { useState } from 'react';

import EditForm from './EditForm';

interface TemplateProps {
  index: number;
  template: string;
  deleteTemplate: (value: string) => void;
  updateTemplate: (oldValue: string, newValue: string) => void;
}

const Template = ({ template, index, updateTemplate, deleteTemplate }: TemplateProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);

  if (editOpen) {
    return <EditForm setEditOpen={setEditOpen} editOpen={editOpen} template={template} updateTemplate={updateTemplate} />
  } else {
    return (
      <div key={index}>
        <h3>{index + 1}.) {template}</h3>
        <button onClick={() => navigator.clipboard.writeText(template)} >Copy</button>
        <button onClick={() => setEditOpen(true)} >Edit</button>
        <button onClick={() => {
          deleteTemplate(template)
        }} >X</button>
      </div>
    )
  }

}

export default Template