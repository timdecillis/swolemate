import { useState, SyntheticEvent, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Variables from './Variables';
import AddVariable from './EditorPalette/AddVariable';

import { setNewTemplateOpen } from '../templatesSlice';
import { postNewTemplate, TemplateType } from './newTemplateSlice';
import { getUser } from '../../userSlice';

type EditorPaletteProps = {
  template: TemplateType;
  setTemplate: React.Dispatch<SetStateAction<TemplateType>>;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
  setPaletteOpen: React.Dispatch<SetStateAction<boolean>>;
}

const EditorPalette = ({ template, setTemplate, setEditOpen, setPaletteOpen }: EditorPaletteProps) => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [newVariableOpen, setNewVariableOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const addTextToString = (input: string) => {
    let prevString = [...template.string];
    prevString.push(input);
    setTemplate({ ...template, string: prevString });
  }

  const saveNewTemplate = () => {
    dispatch(postNewTemplate({ user, template }));
    dispatch(setNewTemplateOpen({ condition: false }));
    setEditOpen(false);
  }

  return (
    <>
      <h3>Add text: </h3>
      <form onClick={() => setErrorOpen(false)} onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        if (!input) return setErrorOpen(true);
        addTextToString(input);
        setInput('');
      }} >
        <input value={input} onChange={e => setInput(e.target.value)} type='text' ></input>
        <button type='submit'>Add to template</button>
      </form>
      {errorOpen && <div>Please enter some text to add!</div>}
      <h4> </h4>

      <h3>Add variables:</h3>

      {newVariableOpen && <AddVariable setNewVariableOpen={setNewVariableOpen} template={template} setTemplate={setTemplate} />}

      <button onClick={() => setNewVariableOpen(true)} >Insert variable</button>
      {<Variables />}
      <button onClick={() => {
        dispatch(setNewTemplateOpen({ condition: false }));
        setTemplate({ id: 0, name: '', string: [], variables: {} });
        setPaletteOpen(false);
        setEditOpen(false);
      }} >Discard Template/Cancel Edit</button>
      <button onClick={saveNewTemplate} >Save Template</button>
      <h2> </h2>
    </>
  )
}

export default EditorPalette