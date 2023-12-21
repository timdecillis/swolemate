import { useState, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Variables from './Variables';
import AddVariable from './EditorPalette/AddVariable';

import { getNewVariableOpen, setNewVariableOpen, setNewTemplateOpen, setPaletteOpen, setTemplates } from '../templatesSlice';
import { addTextToString, clearNewTemplate, getNewTemplate, postNewTemplate } from './newTemplateSlice';
import { getUser } from '../../userSlice';

const TemplateEditor = () => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const template = useSelector(getNewTemplate);
  const newVariableOpen = useSelector(getNewVariableOpen);

  const [input, setInput] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const saveNewTemplate = () => {
    const result = dispatch(postNewTemplate({user, template}))
    dispatch(setNewTemplateOpen({ condition: false }));
    dispatch(setTemplates(result));
  }

  return (
    <>
      <h3>Add text: </h3>
      <form onClick={() => setErrorOpen(false)} onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        if (!input) setErrorOpen(true);
        dispatch(addTextToString({ text: input }))
        setInput('');
      }} >
        <input value={input} onChange={e => setInput(e.target.value)} type='text' ></input>
        <button type='submit'>Add to template</button>
      </form>
      {errorOpen && <div>Please enter some text to add!</div>}
      <h4> </h4>

      <h3>Add variables:</h3>

      {newVariableOpen && <AddVariable />}

      <button onClick={() => dispatch(setNewVariableOpen({ condition: true }))} >Insert variable</button>
      {<Variables />}
      <button onClick={() => {
        dispatch(setNewTemplateOpen({ condition: false }));
        dispatch(clearNewTemplate());
        dispatch(setPaletteOpen({ condition: false }));
      }} >Discard Template</button>
      <button onClick={saveNewTemplate} >Save Template</button>
      <h2> </h2>
    </>
  )
}

export default TemplateEditor