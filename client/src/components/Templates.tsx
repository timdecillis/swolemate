import React, { SetStateAction, SyntheticEvent, useState } from 'react';
import axios from 'axios';

import Template from './Template';

interface TemplatesProps {
  setSignedIn: React.Dispatch<SetStateAction<boolean>>
  user: string;
  templates: string[];
  setTemplates: React.Dispatch<React.SetStateAction<string[]>>;
}

const Templates = ({ templates, setTemplates, user, setSignedIn }: TemplatesProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.post('/addTemplate', { template: input, user })
      .then(({ data }) => {
        setTemplates(data);
      })
  }

  const deleteTemplate = (value: string) => {
    instance.delete('/deleteTemplate', { data: { template: value, user } })
      .then(({ data }) => {
        setTemplates(data)
      })
  }

  const mapped = templates.map((template, i) =>
    <Template index={i} template={template} deleteTemplate={deleteTemplate} />
  )

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <h2>Templates</h2>
      <div>
        {templates && mapped}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item">Add a new template: </label><br />
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!" />
      </form>
      <button onClick={() => {
        setSignedIn(false)
      }} >Sign Out</button>
    </>
  )
}

export default Templates