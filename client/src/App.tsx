import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import { setSignedIn, getSignedIn } from './App/userSlice';



function App() {

  const signedIn = useSelector(getSignedIn);

  const [templates, setTemplates] = useState<[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        {signedIn ? <Templates/>
          :
          <SignIn/>}
      </header>
    </div>
  );
}

export default App;