import { useState, } from 'react';

import TemplateEditor from '../TemplateEditor';

import { TemplateType } from './TemplateEditor/newTemplateSlice';
import { useSelector } from 'react-redux';
import { getUser } from '../userSlice';
import Button from '../Button';
import { useCustomDispatch } from '../../Utilities/handlers';

interface TemplateProps {
  index: number;
  string: string;
  template: TemplateType;
}

const Template = ({ index, template, string }: TemplateProps) => {

  const customDispatch = useCustomDispatch();
  const user = useSelector(getUser);

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [copiedOpen, setCopiedOpen] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(string);
    setCopiedOpen(true);
    setTimeout(() => {
      setCopiedOpen(false);
    }, 1800)
  };

  return (
    <div className='template'>
      {editOpen ?
        <TemplateEditor setEditOpen={setEditOpen} existingTemplate={template} />
        :
        <div>
          <h3>{index + 1}.) {template.name}</h3>
          <h4>{string}</h4>
          {copiedOpen && <div>template copied to clipboard</div>}
          <button onClick={copy} >Copy</button>
          <button onClick={() => {
            setEditOpen(true);
          }
          } >Edit</button>
          <Button content='X' handler={() => user && customDispatch.handleDeleteAlert(template.id, user)}/>
        </div>}
    </div>
  );

}

export default Template;