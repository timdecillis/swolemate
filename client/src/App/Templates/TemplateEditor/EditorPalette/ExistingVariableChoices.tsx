import Button from "../../../Button";
import { TemplateType } from "../newTemplateSlice";
import { SetStateAction } from "react";

type ExistingVariableChoicesProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  setNewVariableOpen: React.Dispatch<SetStateAction<boolean>>;
};

const ExistingVariableChoices = ({
  template,
  setTemplate,
  setNewVariableOpen,
}: ExistingVariableChoicesProps) => {
  const addExistingVariable = (name: string) => {
    let prevString = [...template.string];
    prevString.push([name]);
    setTemplate({ ...template, string: prevString });
  };

  const handleInsert = (existing: string) => {
    addExistingVariable(existing);
    setNewVariableOpen(false);
  };

  return (
    <>
      {Object.keys(template.variables).length > 0 && (
        <>
          <h4>Choose a variable: </h4>
          {Object.entries(template.variables).map((tuple, i) => {
            return (
              <div key={i}>
                <div>
                  Name: {tuple[0]} Content: {tuple[1]}
                </div>
                <Button
                  handler={() => handleInsert(tuple[0])}
                  content="Insert"
                />
              </div>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
    </>
  );
};

export default ExistingVariableChoices;
