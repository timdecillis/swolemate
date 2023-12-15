import React, { useState, Dispatch, SetStateAction } from 'react';

import { getNewTemplateOpen } from './templatesSlice';
// import {deleteTemplate }from '../../Utilities/helpers'
import EditForm from './EditForm';
import TemplateEditor from '../TemplateEditor';
import { TemplateType } from '../TemplateEditor';
import { useSelector } from 'react-redux';

interface TemplateProps {
  index: number;
  string: string;
  deleteTemplate: (id: string) => void;
  updateTemplate: (oldValue: string, newValue: string) => void;
  template: TemplateType;
  user?: string | undefined;
  setNewTemplateOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Template = ({index, updateTemplate, deleteTemplate, template, string, user, setNewTemplateOpen }: TemplateProps) => {

  const newTemplateOpen = useSelector(getNewTemplateOpen);

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
    return <TemplateEditor currentTemplate={template}/>
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