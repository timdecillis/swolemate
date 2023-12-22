import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setSignedIn, login, signIn } from './userSlice';

const SignIn = () => {

  const instance = axios.create({ baseURL: 'http://localhost:5000' });

  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!input) {
      setErrorOpen(true);
    } else {
      signIn({ user: input });
    }
  }

  return (
    <div>
      <h3>Enter username</h3>
      <form onSubmit={onSubmit}>
        <input onClick={() => setErrorOpen(false)} onChange={e => setInput(e.target.value)} type='text' />
        <input type='submit' />
      </form>
      {errorOpen && <div>Please enter a username!</div>}
    </div>
  )
}

export default SignIn