import { useSelector, useDispatch } from "react-redux";

// import './App.css';
import "./styles.css";
import Templates from "./App/Templates";
import SignIn from "./App/SignIn";
import TemplateEditor from "./App/TemplateEditor";
import Button from "./App/Button";
import { getSignedIn, getUser, setSignedIn, login } from "./App/userSlice";
import {
  getLoading,
  getNewTemplateOpen,
  setNewTemplateOpen,
  setPaletteOpen,
  setTemplates
} from "./App/Templates/templatesSlice";
import { clearNewTemplate } from "./App/Templates/TemplateEditor/newTemplateSlice";
import { useCustomDispatch } from "./Utilities/handlers";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const signedIn = useSelector(getSignedIn);
  const user = useSelector(getUser);
  const newTemplateOpen = useSelector(getNewTemplateOpen);

  const customDispatch = useCustomDispatch()

  return (
    <div className="container">
      <div className="App">
        {user && <h4 className="user-header">Welcome, {user}!</h4>}
        <div className="App-Template">
          {signedIn ? (
            <>
              <Templates />
              {!newTemplateOpen ? (
                <Button content='Add Template' handler={customDispatch.handleAddTemplate} />
              ) : (
                <TemplateEditor setEditOpen={() => {}} />
              )}
              {loading && <div>PLEASE WAIT</div>}
              <Button content="Sign Out"/>
              <button
                onClick={() => {
                  dispatch(setSignedIn({ condition: false }));
                  dispatch(login({ user: null }));
                  dispatch(clearNewTemplate());
                  dispatch(setNewTemplateOpen({ condition: false }));
                  dispatch(setPaletteOpen({ condition: false }));
                  dispatch(setTemplates([]));
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
