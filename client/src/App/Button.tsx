import { useDispatch } from "react-redux";

import { setNewTemplateOpen, setAddNameOpen } from "./Templates/templatesSlice";

type ButtonProps = {
  content: string;
};

function Button({ content }: ButtonProps) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setNewTemplateOpen({ condition: true }));
    dispatch(setAddNameOpen({ condition: true }));
  };
  return <button onClick={handleClick}>{content}</button>;
}

export default Button;
