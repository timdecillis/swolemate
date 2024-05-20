import { SyntheticEvent, useState } from 'react';

import { signIn } from './userSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {

  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!input) {
      setErrorOpen(true);
    } else {
      dispatch(signIn({ user: input }));
    }
  }

  return (
    <div>
      <h3 className="bg-blue-500 text-white p-4">Login</h3>
      <form onSubmit={onSubmit}>
        <input onClick={() => setErrorOpen(false)} onChange={e => setInput(e.target.value)} type='text' />
        <input type='submit' />
      </form>
      {errorOpen && <div>Please enter a username!</div>}
    </div>
  )
}

export default SignIn