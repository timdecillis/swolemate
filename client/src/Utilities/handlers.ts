import { useDispatch } from "react-redux";
import {
  postNewTemplate,
  TemplateType,
} from "../App/Templates/TemplateEditor/newTemplateSlice";

import {
  setNewTemplateOpen,
  setAddNameOpen,
  setPaletteOpen,
  setTemplates,
  deleteTemplateRequest,
} from "../App/Templates/templatesSlice";
import { clearNewTemplate } from "../App/Templates/TemplateEditor/newTemplateSlice";
import { setSignedIn, login } from "../App/userSlice";

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
  };

  const handleDeleteAlert = (id: number, user: string) => {
    const result = window.confirm(
      "Are you sure you want to permanently delete this template?"
    );
    if (result) dispatch(deleteTemplateRequest({ id, user }));
  };

  const handleDiscard = () => {
    dispatch(setNewTemplateOpen({ condition: false }));
    setPaletteOpen(false);
  };

  const handleSaveNewTemplate = (user: string, template: TemplateType) => {
    dispatch(postNewTemplate({ user, template }));
    dispatch(setNewTemplateOpen({ condition: false }));
  };

  return {
    handleAddTemplate,
    handleSignOut,
    handleDeleteAlert,
    handleDiscard,
    handleSaveNewTemplate,
  };
};
