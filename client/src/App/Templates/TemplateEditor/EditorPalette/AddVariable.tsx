import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNewVariableOpen } from '../../templatesSlice';
import { getNewTemplate, addNewVariable, addExistingVariable } from '../newTemplateSlice';

const AddVariable = () => {

  const dispatch = useDispatch();
  const template = useSelector(getNewTemplate);

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

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
                  dispatch(addExistingVariable({name: tuple[0]}));
                  dispatch(setNewVariableOpen({condition: false}));
                  }} >Insert</button>
              </div>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
      <h4>Create a new variable:</h4>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => {setName(e.target.value)}} placeholder='Variable name' ></input>
      <input onClick={() => setErrorOpen(false)} onChange={(e) => setContent(e.target.value)} placeholder='Variable content' ></input>
      {errorOpen && <div>Please enter a variable name and content!</div>}
      <button onClick={() => dispatch(setNewVariableOpen({condition: false}))} >Discard</button>
      <button onClick={() => {
        if (!name || !content) return setErrorOpen(true);
        dispatch(addNewVariable({name, content}));
        dispatch(setNewVariableOpen({condition: false}));
      }} >Add to template</button>
    </>
  )
}

export default AddVariable