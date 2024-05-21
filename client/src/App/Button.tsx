import { useDispatch } from "react-redux";

import { setNewTemplateOpen, setAddNameOpen } from "./Templates/templatesSlice";

function Button({ content }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setNewTemplateOpen({ condition: true }));
    dispatch(setAddNameOpen({ condition: true }));
  };
  return <button onClick={handleClick}>{content}</button>;
}

export default Button;
