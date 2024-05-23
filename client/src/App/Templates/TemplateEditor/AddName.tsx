import React, { useState, SyntheticEvent, SetStateAction } from "react";

import { setNewTemplateOpen } from "../templatesSlice";
import { TemplateType } from "./newTemplateSlice";
import { useDispatch } from "react-redux";
import Button from "../../Button";

type AddNameProps = {
  setAddNameOpen: React.Dispatch<SetStateAction<boolean>>;
  setPaletteOpen: React.Dispatch<SetStateAction<boolean>>;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  template: TemplateType;
};

const AddName = ({
  setAddNameOpen,
  setPaletteOpen,
  setTemplate,
  template,
}: AddNameProps) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const cancel = () => {
    setAddNameOpen(false);
    dispatch(setNewTemplateOpen({ condition: false }));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!input) return setErrorOpen(true);
    setTemplate({ ...template, name: input });
    setAddNameOpen(false);
    setPaletteOpen(true);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>Please enter a name for the template:</h3>
        <input
          onClick={() => setErrorOpen(false)}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        ></input>
        <input type="submit" value="Save"></input>
        <Button handler={cancel} content="Cancel"/>
      </form>
      {errorOpen && <div>Please enter a name for your template!</div>}
      <h1> </h1>
    </>
  );
};

export default AddName;
