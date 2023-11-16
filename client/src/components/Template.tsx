import React, { useState } from 'react';

import EditForm from './EditForm';

interface TemplateProps {
  index: number;
  template: string;
  deleteTemplate: (value: string) => void;
}

const Template = ({ template, index, deleteTemplate }: TemplateProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);

  if (editOpen) {
    return <EditForm editOpen={editOpen} template={template} />
  } else {
    return (
      <div key={index}>
        <h3>{index + 1}.) {template}</h3>
        <button onClick={() => setEditOpen(true)} >Edit</button>
        <button onClick={() => {
          deleteTemplate(template)
        }} >X</button>
      </div>
    )
  }

}

export default Template