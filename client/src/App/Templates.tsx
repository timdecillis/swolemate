import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

import Template from './Templates/Template';
import NewTemplate from './Templates/NewTemplate';
import { TemplateType } from './Templates/NewTemplate';

interface TemplatesProps {
  setSignedIn: React.Dispatch<SetStateAction<boolean>>;
  user: string;
  templates: TemplateType[];
  setTemplates: Dispatch<SetStateAction<[]>>;
}

const Templates = ({ user, setSignedIn, templates, setTemplates }: TemplatesProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [newTemplateOpen, setNewTemplateOpen] = useState<boolean>(false);

  const updateTemplate = (oldValue: string, newValue: string) => {
    instance.put('/updateTemplate', { oldValue, newValue, user })
      .then(({ data }) => {
        setTemplates(data)
      })
  }

  const deleteTemplate = (id: string) => {
    instance.delete('/deleteTemplate', { data: { id, user } })
      .then(({ data }) => {
        setTemplates(data);
      })
  }

  const renderString = function (template: TemplateType) {
    return template.string.map((part: (string | string[])) => {
      if (Array.isArray(part)) {
        return template.variables[part[0]];
      }
      return part;
    }).join(' ');
  }

  const mapped = templates.map((template, i) => {
    return (
      <Template user={user} setTemplates={setTemplates} newTemplateOpen={newTemplateOpen} setNewTemplateOpen={setNewTemplateOpen} key={i} string={renderString(template)} index={i} template={template} deleteTemplate={deleteTemplate} updateTemplate={updateTemplate} />
    )
  }
  )

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <h2>Templates</h2>

      {!newTemplateOpen && <button onClick={() => setNewTemplateOpen(true)} >Add a new template</button>}

      {newTemplateOpen && <NewTemplate setTemplates={setTemplates} user={user} setNewTemplateOpen={setNewTemplateOpen} newTemplateOpen={newTemplateOpen} />}

      {templates && <div>{mapped}</div>}
      <h1> </h1>
      <button onClick={() => {
        setSignedIn(false)
      }} >Sign Out</button>
    </>
  )
}

export default Templates