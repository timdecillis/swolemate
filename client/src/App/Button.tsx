import { useDispatch } from "react-redux";

import { setNewTemplateOpen, setAddNameOpen } from "./Templates/templatesSlice";

function Button({ content }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setNewTemplateOpen({ condition: true }));
        dispatch(setAddNameOpen({ condition: true }));
      }}
    >
      Add template
    </button>
  );
}

export default Button;
