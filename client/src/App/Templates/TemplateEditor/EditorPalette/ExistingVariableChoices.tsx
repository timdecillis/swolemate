import { TemplateType } from '../newTemplateSlice';
import { SetStateAction } from 'react';

type ExistingVariableChoicesProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  setNewVariableOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ExistingVariableChoices = ({ template, setTemplate, setNewVariableOpen }: ExistingVariableChoicesProps) => {

  const addExistingVariable = (name: string) => {
    let prevString = [...template.string];
    prevString.push([name]);
    setTemplate({ ...template, string: prevString });
  }

  return (
    <>
      {Object.keys(template.variables).length > 0 && (
        <>
          <h4>Choose a variable: </h4>
          {Object.entries(template.variables).map((tuple, i) => {
            return (
              <div key={i} >
                <div>Name: {tuple[0]} Content: {tuple[1]}</div>
                <button onClick={() => {
                  addExistingVariable(tuple[0]);
                  setNewVariableOpen(false);
                }} >Insert</button>
              </div>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
    </>
  )
}

export default ExistingVariableChoices