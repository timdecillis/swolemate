import { useSelector } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import TemplateEditor from './App/TemplateEditor';
import AddTemplate from './App/AddTemplate';
import { getSignedIn, getUser } from './App/userSlice';
import { getNewTemplateOpen } from './App/Templates/templatesSlice';

function App() {

  const signedIn = useSelector(getSignedIn);
  const user = useSelector(getUser);
  const newTemplateOpen = useSelector(getNewTemplateOpen)

  return (
    <div className="App">
      <header className="App-header">
        {user && <h4>Welcome, {user}!</h4>}
        {signedIn ?
          <>
            {!newTemplateOpen ?
              <AddTemplate />
              :
              <TemplateEditor />}
            <Templates />
          </>
          :
          <SignIn />}
      </header>
    </div>
  );
}

export default App;