import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface TemplateProps {
  setTemplates: React.Dispatch<React.SetStateAction<string[]>>;
}

const Templates = ({ setTemplates }: TemplateProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.post('/addFood', { input })
      .then(({data}) => {
        console.log(data)
        setTemplates(data);
      })
  }

  return (
    <>
      <h2>Templates</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item">Add a new template: </label><br />
        <input type="text" id="new_item" name="new_item" onChange={e => setInput(e.target.value)}></input>
        <input type="submit" value="add it!" />
      </form>
    </>
  )
}

export default Templates