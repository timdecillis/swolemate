import { useDispatch } from "react-redux";
import {
  setNewTemplateOpen,
  setAddNameOpen,
} from "../App/Templates/templatesSlice";

export const useCustomDispatch = () => {
  const dispatch = useDispatch();
  const handleAddTemplate = () => {
    dispatch(setNewTemplateOpen({ condition: true }));
    dispatch(setAddNameOpen({ condition: true }));
  };

  return { handleAddTemplate };
};
