import React, { useState } from 'react';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';

function App() {

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [templates, setTemplates] = useState<[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        {!signedIn && <SignIn setTemplates={setTemplates} label='Enter username' user={user} signedIn={signedIn} setSignedIn={setSignedIn} setUser={setUser}/>}
        {signedIn && <Templates setTemplates={setTemplates} setSignedIn={setSignedIn} user={user} />}
      </header>
    </div>
  );
}

export default App;