import { useSelector } from "react-redux";

import "./styles.css";
import Templates from "./App/Templates";
import SignIn from "./App/SignIn";
import TemplateEditor from "./App/TemplateEditor";
// import Button from "./App/Button";
import { getSignedIn, getUser } from "./App/userSlice";
import { getLoading, getNewTemplateOpen } from "./App/Templates/templatesSlice";
import { useCustomDispatch } from "./Utilities/handlers";
import { Button, Input, BottomNavigation, Link } from "@mui/material";

function App() {
  const loading = useSelector(getLoading);
  const signedIn = useSelector(getSignedIn);
  const user = useSelector(getUser);
  const newTemplateOpen = useSelector(getNewTemplateOpen);

  const customDispatch = useCustomDispatch();

  return (
    <div className="container">
      <div className="App">
        {user && <h4 className="user-header">Welcome, {user}!</h4>}
        <div className="App-Template">
          {/* {signedIn ? (
            <>
              <Templates />
              {!newTemplateOpen ? (
                <Button
                  content="Add Template"
                  handler={customDispatch.handleAddTemplate}
                />
              ) : (
                <TemplateEditor setEditOpen={() => {}} />
              )}
              {loading && <div>PLEASE WAIT</div>}
              <Button
                content="Sign Out"
                handler={customDispatch.handleSignOut}
              />
            </>
          ) : (
            <SignIn />
          )} */}
        </div>
        <Input/>
        <Button variant="contained">Hello</Button>
        <BottomNavigation>
          <Link>Foo</Link>
        </BottomNavigation>
      </div>
    </div>
  );
}

export default App;
