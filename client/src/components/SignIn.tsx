import axios from 'axios';
import React, { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';

interface SignInProps {
  setSignedIn: Dispatch<SetStateAction<boolean>>
  setTemplates: Dispatch<SetStateAction<string[]>>
  signedIn: boolean
}

const SignIn = ({ setTemplates, signedIn, setSignedIn }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [user, setUser] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.get('/getUserTemplates', { params: { user } })
      .then(({ data }) => {
        setTemplates(data);
      })
  }

  return (
    <div>
      <h3>Enter username</h3>
      <form onSubmit={onSubmit}>
        <input onChange={e => setUser(e.target.value)} type='text' />
        <input type='submit' />
      </form>
      <button onClick={() => {
        setSignedIn(false)
      }} >Sign Out</button>
    </div>
  )
}

export default SignIn