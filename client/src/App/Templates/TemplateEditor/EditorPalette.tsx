import { useState, SyntheticEvent, SetStateAction } from "react";
import { useSelector } from "react-redux";

import Variables from "./Variables";
import AddVariable from "./EditorPalette/AddVariable";

import { TemplateType } from "./newTemplateSlice";
import { getUser } from "../../userSlice";
import Button from "../../Button";
import { useCustomDispatch } from "../../../Utilities/handlers";

type EditorPaletteProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
  setPaletteOpen: React.Dispatch<SetStateAction<boolean>>;
};

const EditorPalette = ({
  template,
  setTemplate,
  setEditOpen,
  setPaletteOpen,
}: EditorPaletteProps) => {
  const customDispatch = useCustomDispatch();
  const user = useSelector(getUser);

  const [newVariableOpen, setNewVariableOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const addTextToString = (input: string) => {
    let prevString = [...template.string];
    prevString.push(input);
    setTemplate({ ...template, string: prevString });
  };

  const saveNewTemplate = () => {
    if (user !== null) {
      customDispatch.handleSaveNewTemplate(user, template);
      setEditOpen(false);
    }
  };

  const discard = () => {
    customDispatch.handleDiscard();
    setTemplate({ id: 0, name: "", string: [], variables: {} });
    setPaletteOpen(false);
  };

  return (
    <>
      <h3>Add text: </h3>
      <form
        onClick={() => setErrorOpen(false)}
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          if (!input) return setErrorOpen(true);
          addTextToString(input);
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        ></input>
        <Button type="submit" content="Add to template" />
      </form>

      {errorOpen && <div>Please enter some text to add!</div>}

      <h4> </h4>
      <h3>Add variables:</h3>

      {newVariableOpen ? (
        <AddVariable
          setNewVariableOpen={setNewVariableOpen}
          template={template}
          setTemplate={setTemplate}
        />
      ) : (
        <button onClick={() => setNewVariableOpen(true)}>
          Insert variable
        </button>
      )}

      <Variables setTemplate={setTemplate} template={template} />
      <Button content="Discard Template/Cancel Edit" handler={discard} />
      <Button handler={saveNewTemplate} content="Save Template" />
      <h2> </h2>
    </>
  );
};

export default EditorPalette;
