import { useState, SyntheticEvent, SetStateAction } from "react";

import { TemplateType } from "./newTemplateSlice";
import Button from "../../Button";

interface EditVariableProps {
  setEditVariableOpen: React.Dispatch<SetStateAction<boolean>>;
  variable: string[];
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  template: TemplateType;
}

const EditVariable = ({
  setEditVariableOpen,
  variable,
  setTemplate,
  template,
}: EditVariableProps) => {
  let [variableName, setVariableName] = useState<string>("");
  let [variableContent, setVariableContent] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let prevName = "";
    let name = "";
    let content = "";
    if (!variableContent) {
      prevName = variable[0];
    }
    if (!variableName) {
      name = variable[0];
    } else {
      name = variableName;
    }
    if (!variableContent) {
      content = variable[1];
    } else {
      content = variableContent;
    }
    let string = [...template.string];
    let variables = { ...template.variables };
    if (prevName) {
      string.forEach((item: string | string[], i) => {
        if (Array.isArray(item) && item[0] === prevName) {
          (item as string[])[0] = name;
        }
      });

      delete variables[prevName];
      variables[name] = content;
    } else {
      variables[name] = content;
    }
    setTemplate({ ...template, string, variables });
    setEditVariableOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setVariableName(e.target.value)}
          type="text"
          defaultValue={variable[0]}
        ></input>
        <input
          onChange={(e) => setVariableContent(e.target.value)}
          type="text"
          defaultValue={variable[1]}
        ></input>
        <Button type="submit" content="Save" />
      </form>
      <Button handler={() => setEditVariableOpen(false)} content="Cancel" />
    </>
  );
};

export default EditVariable;
