import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

import './App.css';
import Templates from './components/Templates';

function App() {

  const [templates, setTemplates] = useState<string[]>([]);
  const [user, setUser] = useState('');

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.get('/getUserTemplates', { params: { user } })
      .then(({data}) => {
        setTemplates(data);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Enter username</h3>
          <form onSubmit={onSubmit}>
            <input onChange={e => setUser(e.target.value)} type='text' />
            <input type='submit' />
          </form>
        </div>
        <Templates setTemplates={setTemplates} templates={templates} />
      </header>
    </div>
  );
}

export default App;