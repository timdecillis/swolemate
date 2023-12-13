import React, { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSignedIn, getSignedIn } from './userSlice';

interface SignInProps {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  setTemplates: Dispatch<SetStateAction<[]>>;
}

const SignIn = ({ setUser, setTemplates }: SignInProps) => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const dispatch = useDispatch();

  const signedIn = useSelector(getSignedIn);

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if(!input) setErrorOpen(true);
    console.log('prior status:', signedIn)
    dispatch(setSignedIn({ condition: true }))
    setUser(input);
    console.log('current status:', signedIn)

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