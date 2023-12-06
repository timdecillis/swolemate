import React, { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';
import axios from 'axios';

interface SignInProps {
  label: string
  user: string
  setUser: Dispatch<SetStateAction<string>>
  setSignedIn: Dispatch<SetStateAction<boolean>>
  signedIn: boolean
}

const SignIn = ({ setSignedIn, setUser, label }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.get('/getUserTemplates', { params: { user: input } })
      .then(({ data }) => {
        setSignedIn(true)
      })
  }

  return (
    <div>
      <h3>{label}</h3>
      <form onSubmit={onSubmit}>
        <input onClick={() => setErrorOpen(false)} onChange={e => setInput(e.target.value)} type='text' />
        <input type='submit' />
      </form>
      {errorOpen &&
      <div>Please enter a username!</div>
      }
    </div>
  )
}

export default SignIn