import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import { setSignedIn, getSignedIn } from './App/userSlice';



function App() {
  const dispatch = useDispatch();
  const onSignInClicked = () => {
    dispatch(setSignedIn({ condition: true }))
  }
  const signedIn = useSelector(getSignedIn);

  const [user, setUser] = useState<string>('');
  const [templates, setTemplates] = useState<[]>([]);

    return (
      <div className="App">
        <header className="App-header">
          {!signedIn && <SignIn setTemplates={setTemplates} label='Enter username' user={user} signedIn={signedIn} setSignedIn={setSignedIn} setUser={setUser} />}
        {signedIn && <Templates templates={templates} setTemplates={setTemplates} setSignedIn={setSignedIn} user={user} />}
        <button onClick={onSignInClicked}>push me</button>
        </header>
      </div>
    );
}

export default App;