import { useDispatch } from "react-redux";

import {
  setNewTemplateOpen,
  setAddNameOpen,
  getLoading,
  getNewTemplateOpen,
  setPaletteOpen,
  setTemplates,
} from "../App/Templates/templatesSlice";
import { clearNewTemplate } from "../App/Templates/TemplateEditor/newTemplateSlice";
import { getSignedIn, getUser, setSignedIn, login } from "../App/userSlice";

export const useCustomDispatch = () => {
  const dispatch = useDispatch();

  const handleAddTemplate = () => {
    dispatch(setNewTemplateOpen({ condition: true }));
    dispatch(setAddNameOpen({ condition: true }));
  };

  const handleSignOut = () => {
    dispatch(setSignedIn({ condition: false }));
    dispatch(login({ user: null }));
    dispatch(clearNewTemplate());
    dispatch(setNewTemplateOpen({ condition: false }));
    dispatch(setPaletteOpen({ condition: false }));
    dispatch(setTemplates([]));
  }


  return { handleAddTemplate, handleSignOut };
};
