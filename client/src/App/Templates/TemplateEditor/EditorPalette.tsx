import { useState, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddVariable from './EditorPalette/AddVariable';
import EditVariable from './EditVariable';
import { getNewVariableOpen, setNewVariableOpen, setNewTemplateOpen, setPaletteOpen } from '../templatesSlice';
import { getNewTemplate, addTextToString, clearNewTemplate } from './newTemplateSlice';

const TemplateEditor = () => {

  const dispatch = useDispatch();
  const template = useSelector(getNewTemplate);
  const newVariableOpen = useSelector(getNewVariableOpen);

  const [editVariableOpen, setEditVariableOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [variable, setVariable] = useState<string[]>([]);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  // const editVariable = (prevName: string, name: string, content: string) => {
  //   if (prevName) {
  //     let newString = template.string;
  //     newString.forEach((item: (string | string[])) => {
  //       if (Array.isArray(item) && item[0] === prevName) item[0] = name;
  //     })
  //     let newVariables = template.variables;
  //     delete newVariables[prevName];
  //     newVariables[name] = content;
  //     setTemplate((prevTemplate) => ({...prevTemplate, variables: newVariables, string: newString}))
  //   } else {
  //     setTemplate(prevTemplate => ({
  //       ...prevTemplate, variables: { ...prevTemplate.variables, [name]: content }
  //     }));
  //   }
  // }

  let variables = Object.entries(template.variables).map((entry, i) => {
    return (
      <div key={i}>
        <div>Name: {entry[0]}</div>
        <div>Content: {entry[1]}</div>
        <button onClick={() => {
          setEditVariableOpen(true);
          setVariable(entry);
        }}>Edit</button>
        <h1> </h1>
      </div>
    )
  });

  return (
    <>
      <h3>Add text: </h3>
      <form onClick={() => setErrorOpen(false)} onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        if (!input) setErrorOpen(true);
        dispatch(addTextToString({text: input}))
        setInput('');
      }} >
        <input value={input} onChange={e => setInput(e.target.value)} type='text' ></input>
        <button type='submit'>Add to template</button>
      </form>
      {errorOpen && <div>Please enter some text to add!</div>}
      <h4> </h4>

      <h3>Add variables:</h3>
      {variables}

      {editVariableOpen && <EditVariable variable={variable} editVariableOpen={editVariableOpen} setEditVariableOpen={setEditVariableOpen} />}

      {newVariableOpen && <AddVariable/>}

      <button onClick={() => dispatch(setNewVariableOpen({condition: true}))} >Insert variable</button>
      <button onClick={() => {
        dispatch(setNewTemplateOpen({condition: false}));
        dispatch(clearNewTemplate());
        dispatch(setPaletteOpen({condition: false}));
        }} >Discard Template</button>
      {/* <button onClick={saveNewTemplate} >Save Template</button> */}
      <h2> </h2>
    </>
  )
}

export default TemplateEditor