import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { getTemplates } from './Templates/templatesSlice';
import { getUser, setSignedIn } from './userSlice'
import Template from './Templates/Template';
import TemplateEditor from './Templates/TemplateEditor';
import { TemplateType } from './Templates/TemplateEditor';

interface TemplatesProps {
  setSignedIn: React.Dispatch<SetStateAction<boolean>>;
  templates: TemplateType[];
  setTemplates: Dispatch<SetStateAction<[]>>;
}

const Templates = ({ setTemplates }: TemplatesProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const templates = useSelector(getTemplates);

  const [newTemplateOpen, setNewTemplateOpen] = useState<boolean>(false);
  const [addNameOpen, setAddNameOpen] = useState<boolean>(false);

  const updateTemplate = (oldValue: string, newValue: string) => {
    // instance.put('/updateTemplate', { oldValue, newValue, user })
    //   .then(({ data }) => {
    //     setTemplates(data)
    //   })
  }

  const deleteTemplate = (id: string) => {
    // instance.delete('/deleteTemplate', { data: { id, user } })
    //   .then(({ data }) => {
    //     setTemplates(data);
    //   })
  }

  const renderString = function (template: TemplateType) {
    return template.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return template.variables[part[0]];
      }
      return part;
    }).join(' ');
  }

  // const mapped = templates.map((template, i) => {
  //   return (
  //     <Template setTemplates={setTemplates} newTemplateOpen={newTemplateOpen} setNewTemplateOpen={setNewTemplateOpen} key={i} string={renderString(template)} index={i} template={template} deleteTemplate={deleteTemplate} updateTemplate={updateTemplate} />
  //   )
  // }
  // )

  return (
    <>
      <h4>Welcome, {user}!</h4>

      {!newTemplateOpen ?
        <button onClick={() => {
          setNewTemplateOpen(true);
          setAddNameOpen(true);
        }
        } >Add a new template</button>
        :
        <TemplateEditor addNameOpen={addNameOpen} setAddNameOpen={setAddNameOpen} setTemplates={setTemplates} />}

      <h1>Templates</h1>

      {templates && <div></div>}
      <h1> </h1>

      <button onClick={() => {
        dispatch(setSignedIn({condition: false}))
      }} >Sign Out</button>
    </>
  )
}

export default Templates