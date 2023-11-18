import React, { SetStateAction, SyntheticEvent, useState } from 'react';
import axios from 'axios';

import Template from './Template';

interface TemplatesProps {
  setSignedIn: React.Dispatch<SetStateAction<boolean>>
  user: string;
  templates: string[];
  setTemplates: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTemplate = ({ templates, setTemplates, user, setSignedIn }: TemplatesProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');

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
    <Template index={i} template={template} deleteTemplate={deleteTemplate} updateTemplate={updateTemplate} />
  )

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <h2>Templates</h2>
      <div>
        {templates && mapped}
      </div>
      <button>Add a new template</button>
      <button onClick={() => {
        setSignedIn(false)
      }} >Sign Out</button>
    </>
  )
}

export default NewTemplate