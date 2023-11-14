
import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface SignInProps {
  setTemplates: React.Dispatch<React.SetStateAction<[]>>

}

const SignIn = ({ setTemplates }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const [user, setUser] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    instance.get('/getUserTemplates', { params: { user } })
      .then(({data}) => {
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
    </div>
  )
}

export default SignIn