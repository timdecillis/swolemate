import { SetStateAction, useState } from "react";

import EditVariable from "./EditVariable";
import { TemplateType } from "./newTemplateSlice";

type VariablesProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
};

const Variables = ({ template, setTemplate }: VariablesProps) => {
  const [editVariableOpen, setEditVariableOpen] = useState<boolean>(false);
  const [variable, setVariable] = useState<string[]>([]);

  const handleEdit = (entry: string[]) => {
    setEditVariableOpen(true);
    setVariable(entry);
  };

  let variables = Object.entries(template.variables).map((entry, i) => {
    return (
      <div key={i}>
        <div>Name: {entry[0]}</div>
        <div>Content: {entry[1]}</div>
        <button onClick={() => handleEdit(entry)}>Edit</button>
        <h1> </h1>
      </div>
    );
  });

  return (
    <div>
      <h3>Variableszzz</h3>
      {variables}
      {editVariableOpen && (
        <EditVariable
          template={template}
          setTemplate={setTemplate}
          variable={variable}
          setEditVariableOpen={setEditVariableOpen}
        />
      )}
    </div>
  );
};

export default Variables;
