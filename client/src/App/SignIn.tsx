import React, { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSignedIn, login } from './userSlice';

interface SignInProps {
  setTemplates: Dispatch<SetStateAction<[]>>;
}

const SignIn = ({ setTemplates }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if(!input) setErrorOpen(true);
    dispatch(setSignedIn({ condition: true }));
    dispatch(login({user: input}));

    // instance.get('/getUserTemplates', { params: { user: input } })
    //   .then(({ data }) => {
    //     setTemplates(data);
    //     // setSignedIn(true);
    //   })
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