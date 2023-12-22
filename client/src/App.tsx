import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import TemplateEditor from './App/TemplateEditor';
import AddTemplate from './App/AddTemplate';
import { getSignedIn, getUser, setSignedIn, login } from './App/userSlice';
import { getNewTemplateOpen, setNewTemplateOpen, setPaletteOpen, setTemplates } from './App/Templates/templatesSlice';
import { clearNewTemplate } from './App/Templates/TemplateEditor/newTemplateSlice';

function App() {

  const dispatch = useDispatch();
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
              <AddTemplate/>
              :
              <TemplateEditor/>}
            <Templates />
            <button onClick={() => {
              dispatch(setSignedIn({ condition: false }));
              dispatch(login({user: null}));
              // dispatch(clearNewTemplate());
              dispatch(setNewTemplateOpen({condition: false}));
              dispatch(setPaletteOpen({condition: false}));
              dispatch(setTemplates([]))
            }} >Sign Out</button>
          </>
          :
          <SignIn/>}
      </header>
    </div>
  );
}

export default App;