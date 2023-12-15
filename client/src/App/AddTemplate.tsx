import { useDispatch } from 'react-redux';

import { setNewTemplateOpen, setAddNameOpen } from './Templates/templatesSlice';

function AddTemplate() {

  const dispatch = useDispatch();

  return (
    <button onClick={() => {
      dispatch(setNewTemplateOpen({condition: true}));
      dispatch(setAddNameOpen({condition: true}));
    }
    } >Add a new template</button>
  );
}

export default AddTemplate;