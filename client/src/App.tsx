import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Templates from './components/Templates';
import SignIn from './components/SignIn';

function App() {

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [templates, setTemplates] = useState<string[]>([]);
  const [user, setUser] = useState<string>('');

  return (
    <div className="App">
      <header className="App-header">
        {!signedIn && <SignIn user={user} signedIn={signedIn} setSignedIn={setSignedIn} setUser={setUser} setTemplates={setTemplates} />}
        {signedIn && <Templates setSignedIn={setSignedIn} user={user} setTemplates={setTemplates} templates={templates} />}
      </header>
    </div>
  );
}

export default App;