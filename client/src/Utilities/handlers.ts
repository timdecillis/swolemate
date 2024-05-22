import { useDispatch } from "react-redux";

import {
  setNewTemplateOpen,
  setAddNameOpen,
  getLoading,
  getNewTemplateOpen,
  setPaletteOpen,
  setTemplates,
} from "../App/Templates/templatesSlice";

import { getSignedIn, getUser, setSignedIn, login } from "../App/userSlice";

export const useCustomDispatch = () => {
  const dispatch = useDispatch();

  const handleAddTemplate = () => {
    dispatch(setNewTemplateOpen({ condition: true }));
    dispatch(setAddNameOpen({ condition: true }));
  };

  const handleSignOut = () => {

  }


  return { handleAddTemplate };
};
