import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import axios from 'axios';

import Template from './Templates/Template';
import NewTemplate from './Templates/NewTemplate';
import { TemplateType } from './Templates/NewTemplate';

interface TemplatesProps {
  setSignedIn: React.Dispatch<SetStateAction<boolean>>;
  user: string;
  setTemplates: Dispatch<SetStateAction<[]>>;
}

const Templates = ({ user, setSignedIn }: TemplatesProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState<string>('');
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const [newTemplateOpen, setNewTemplateOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.post('/addTemplate', { template: input, user })
      .then(({ data }) => {
        setTemplates(data);
        setInput('');
      })
  }

  const updateTemplate = (oldValue: string, newValue: string) => {
    instance.put('/updateTemplate', { oldValue, newValue, user })
      .then(({ data }) => {
        setTemplates(data)
      })
  }

  const deleteTemplate = (value: string) => {
    instance.delete('/deleteTemplate', { data: { template: value, user } })
      .then(({ data }) => {
        setTemplates(data)
      })
  }

  const mapped = templates.map((template, i) =>
    <Template index={i} deleteTemplate={deleteTemplate} updateTemplate={updateTemplate} />
  )

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <h2>Templates</h2>
      {!newTemplateOpen && <button onClick={() => setNewTemplateOpen(true)} >Add a new template</button>}
      {newTemplateOpen && <NewTemplate user={user} setNewTemplateOpen={setNewTemplateOpen} newTemplateOpen={newTemplateOpen} />}
      <div>{templates && mapped}</div>
      <h1> </h1>
      <button onClick={() => {
        setSignedIn(false)
      }} >Sign Out</button>
    </>
  )
}

export default Templates