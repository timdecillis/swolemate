import axios from 'axios';
import React, { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';

interface SignInProps {
  label: string
  user: string
  setUser: Dispatch<SetStateAction<string>>
  setSignedIn: Dispatch<SetStateAction<boolean>>
  setTemplates: Dispatch<SetStateAction<string[]>>
  signedIn: boolean
}

const SignIn = ({ setTemplates, signedIn, setSignedIn, setUser, user, label }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!input) return setErrorOpen(true);
    setUser(input)
    instance.get('/getUserTemplates', { params: { user: input } })
      .then(({ data }) => {
        setTemplates(data);
        setSignedIn(true)
      })
  }

  return (
    <div>
      <h3>{label}</h3>
      <form onSubmit={onSubmit}>
        <input onChange={e => setInput(e.target.value)} type='text' />
        <input type='submit' />
      </form>
    </div>
  )
}

export default SignIn