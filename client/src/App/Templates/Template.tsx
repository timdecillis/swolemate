import { useState, } from 'react';

import TemplateEditor from '../TemplateEditor';

import { TemplateType, addExistingTemplate } from './TemplateEditor/newTemplateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../userSlice';
import { deleteTemplateRequest } from './templatesSlice';

interface TemplateProps {
  index: number;
  string: string;
  template: TemplateType;
}

const Template = ({ index, template, string }: TemplateProps) => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);

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
    if (result) dispatch(deleteTemplateRequest({ id: template.id, user }));
  }

  if (editOpen) {
    return <TemplateEditor existingTemplate={template} />
  } else {
    return (
      <div>
        <h3>{index + 1}.) {template.name}</h3>
        <h4>{string}</h4>
        {copiedOpen && <div>template copied to clipboard</div>}
        <button onClick={() => copy(string)} >Copy</button>
        <button onClick={() => {
          setEditOpen(true);
          dispatch(addExistingTemplate({template}))
        }
        } >Edit</button>
        <button onClick={deleteAlert} >X</button>
      </div>
    )
  }
}

export default Template