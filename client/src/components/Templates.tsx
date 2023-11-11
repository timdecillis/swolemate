import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface TemplateProps {
  user: string;
  templates: string[];
  setTemplates: React.Dispatch<React.SetStateAction<string[]>>;
}

const Templates = ({ templates, setTemplates, user }: TemplateProps) => {

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

  const deleteTemplate = (value: number) => {
    instance.delete('/deleteTemplate', { data: { index: value, user }})
      .then(() => {
        console.log('deleted!')
      })
  }

  return (
    <>
      <h2>Templates</h2>
      <div>
        {templates && templates.map((template, i) =>
          <div key={i}>
            <h3>{i + 1}.) {template}</h3>
            <button onClick={() => {
              deleteTemplate(i)
            }} >X</button>
          </div>
        )}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item">Add a new template: </label><br />
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!" />
      </form>
    </>
  )
}

export default Templates