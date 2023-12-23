import { useSelector, useDispatch } from 'react-redux';

// import './App.css';
import './styles.css';
import Templates from './App/Templates';
import SignIn from './App/SignIn';
import TemplateEditor from './App/TemplateEditor';
import AddTemplate from './App/AddTemplate';
import { getSignedIn, getUser, setSignedIn, login } from './App/userSlice';
import { getLoading, getNewTemplateOpen, setNewTemplateOpen, setPaletteOpen, setTemplates } from './App/Templates/templatesSlice';
import { clearNewTemplate } from './App/Templates/TemplateEditor/newTemplateSlice';

function App() {

  const dispatch = useDispatch();
  const loading = useSelector(getLoading)
  const signedIn = useSelector(getSignedIn);
  const user = useSelector(getUser);
  const newTemplateOpen = useSelector(getNewTemplateOpen)

  return (
    <div className='container'>
      <div className="App">
        {/* // <div> */}
        {/* <header> */}
        {user && <h4 className='user-header'>Welcome, {user}!</h4>}
        <div className='App-Template'>

          {signedIn ?
            <>
              {!newTemplateOpen ?
                <AddTemplate />
                :
                <TemplateEditor />}
              <Templates />
              {loading && <div>PLEASE WAIT</div>}
              <button onClick={() => {
                dispatch(setSignedIn({ condition: false }));
                dispatch(login({ user: null }));
                dispatch(clearNewTemplate());
                dispatch(setNewTemplateOpen({ condition: false }));
                dispatch(setPaletteOpen({ condition: false }));
                dispatch(setTemplates([]))
              }} >Sign Out</button>
            </>
            :
            <SignIn />}
        </div>
      </div>
    </div>
  );
}

export default App;