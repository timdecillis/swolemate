import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

import './App.css';
import Templates from './components/Templates';
import SignIn from './components/SignIn';

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [templates, setTemplates] = useState<string[]>([]);
  const [user, setUser] = useState('');

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  return (
    <div className="App">
      <header className="App-header">
        {!signedIn && <SignIn signedIn={signedIn} setSignedIn={setSignedIn} setTemplates={setTemplates} />}
        {signedIn && <Templates user={user} setTemplates={setTemplates} templates={templates} />}
      </header>
    </div>
  );
}

export default App;