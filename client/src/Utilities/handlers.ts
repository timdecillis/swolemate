import { useDispatch } from "react-redux";

import {
  setNewTemplateOpen,
  setAddNameOpen,
  getLoading,
  getNewTemplateOpen,
  setPaletteOpen,
  setTemplates,
  deleteTemplateRequest,
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

  const deleteAlert = (id: number, user: string) => {
    const result = window.confirm('Are you sure you want to permanently delete this template?');
    if (result) dispatch(deleteTemplateRequest({ id, user }));
  };

  return { handleAddTemplate, handleSignOut, deleteAlert };
};
