import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNewVariableOpen } from '../../templatesSlice';
import { TemplateType } from '../newTemplateSlice';

type AddVariableProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
}

const AddVariable = ({ template, setTemplate }: AddVariableProps) => {

  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const addExistingVariable = (name: string) => {
    console.log('adding existing', template.string)
    let prevString = template.string;
    prevString.push([name]);
    setTemplate({ ...template, string: prevString });
  }

  const addNewVariable = () => {
    let prevString = template.string;
    let prevVariables = template.variables;
    prevString.push([name]);
    setTemplate({ ...template, string: prevString, variables: { ...template.variables, [name]: content } })
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
                  dispatch(setNewVariableOpen({ condition: false }));
                }} >Insert</button>
              </div>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
      <h4>Create a new variable:</h4>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => { setName(e.target.value) }} placeholder='Variable name' ></input>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => setContent(e.target.value)} placeholder='Variable content' ></input>
      {errorOpen && <div>Please enter a variable name and content!</div>}
      <button onClick={() => dispatch(setNewVariableOpen({ condition: false }))} >Discard</button>
      <button onClick={() => {
        if (!name || !content) return setErrorOpen(true);
        addNewVariable();
        dispatch(setNewVariableOpen({ condition: false }));
      }} >Add to template</button>
    </>
  )
}

export default AddVariable