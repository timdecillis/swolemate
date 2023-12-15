import { useSelector } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import { getSignedIn, getUser } from './App/userSlice';

function App() {

  const signedIn = useSelector(getSignedIn);
  const user = useSelector(getUser);

  return (
    <div className="App">
      <header className="App-header">
      {user && <h4>Welcome, {user}!</h4>}
        {signedIn ? <Templates/>
          :
          <SignIn/>}
      </header>
    </div>
  );
}

export default App;