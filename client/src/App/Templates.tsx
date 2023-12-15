import { useSelector, useDispatch } from 'react-redux';

import { getTemplates, setNewTemplateOpen, getNewTemplateOpen, setAddNameOpen, addNameOpen } from './Templates/templatesSlice';
import { getUser, setSignedIn } from './userSlice'
import Template from './Templates/Template';
import TemplateEditor from './Templates/TemplateEditor';

const Templates = () => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const templates = useSelector(getTemplates);
  const newTemplateOpen = useSelector(getNewTemplateOpen);
  const nameOpen = useSelector(addNameOpen);

  // const mapped = templates.map((template, i) => {
  //   return (
  //     <Template setTemplates={setTemplates} newTemplateOpen={newTemplateOpen} setNewTemplateOpen={setNewTemplateOpen} key={i} string={renderString(template)} index={i} template={template} deleteTemplate={deleteTemplate} updateTemplate={updateTemplate} />
  //   )
  // }
  // )

  return (
    <>
      <h4>Welcome, {user}!</h4>

      {newTemplateOpen ?
        <TemplateEditor/>
        :
        <button onClick={() => {
          dispatch(setNewTemplateOpen({condition: true}));
          dispatch(setAddNameOpen({condition: true}));
        }
        } >Add a new template</button>
      }

      <h1>Templates</h1>

      {templates.length > 0 && <div>there are templates</div>}
      <h1> </h1>

      <button onClick={() => {
        dispatch(setSignedIn({ condition: false }))
      }} >Sign Out</button>
    </>
  )
}

export default Templates