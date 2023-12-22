import React, { SyntheticEvent, useState } from 'react';

import { signIn } from './userSlice';

const SignIn = () => {

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