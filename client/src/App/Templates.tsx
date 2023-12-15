import { useSelector, useDispatch } from 'react-redux';

import { getTemplates, setNewTemplateOpen, getNewTemplateOpen, getAddNameOpen } from './Templates/templatesSlice';
import { getUser, setSignedIn } from './userSlice'
import Template from './Templates/Template';

const Templates = () => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const templates = useSelector(getTemplates);
  const newTemplateOpen = useSelector(getNewTemplateOpen);
  const nameOpen = useSelector(getAddNameOpen);

  // const mapped = templates.map((template, i) => {
  //   return (
  //     <Template/>
  //   )
  // }
  // )

  return (
    <>
      <h1>Templates</h1>
      {/* {templates.length > 0 && <div>{mapped}</div>} */}
      <h1> </h1>
    </>
  )
}

export default Templates