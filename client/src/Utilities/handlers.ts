import { useDispatch } from "react-redux";
import {
  setNewTemplateOpen,
  setAddNameOpen,
} from "../App/Templates/templatesSlice";

export const useHandleAddTemplate = () => {
  const dispatch = useDispatch();
  dispatch(setNewTemplateOpen({ condition: true }));
  dispatch(setAddNameOpen({ condition: true }));
};
