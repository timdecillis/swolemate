import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import { setSignedIn, getSignedIn } from './App/userSlice';



function App() {

  const signedIn = useSelector(getSignedIn);

  const [user, setUser] = useState<string>('');
  const [templates, setTemplates] = useState<[]>([]);

    return (
      <div className="App">
        <header className="App-header">
          {!signedIn && <SignIn setTemplates={setTemplates} user={user} setUser={setUser} />}
        {signedIn && <Templates templates={templates} setTemplates={setTemplates} setSignedIn={setSignedIn} user={user} />}
        </header>
      </div>
    );
}

export default App;