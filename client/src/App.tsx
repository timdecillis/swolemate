import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import TemplateEditor from './App/TemplateEditor';
import AddTemplate from './App/AddTemplate';
import { getSignedIn, getUser, setSignedIn, login } from './App/userSlice';
import { getNewTemplateOpen, setNewTemplateOpen, setPaletteOpen } from './App/Templates/templatesSlice';
import { clearNewTemplate } from './App/Templates/TemplateEditor/newTemplateSlice';

function App() {

  const initialState = {value: 0};
  const INCREMENT = 'INCREMENT';
  const incrementAction = {type: INCREMENT};
  const reducer = (state: any, action: any) => {
    return {state: state.value + 1};
  }

  const store = createStore(reducer);

  console.log(createStore(reducer));






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
              dispatch(clearNewTemplate());
              dispatch(setNewTemplateOpen({condition: false}));
              dispatch(setPaletteOpen({condition: false}));
            }} >Sign Out</button>
          </>
          :
          <SignIn/>}

      </header>
    </div>
  );
}

export default App;