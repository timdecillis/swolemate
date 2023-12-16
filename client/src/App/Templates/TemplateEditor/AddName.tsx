import React, { useState, SyntheticEvent, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAddNameOpen, setPaletteOpen, setNewTemplateOpen } from '../templatesSlice';
import { addName, getNewTemplate } from './newTemplateSlice';
import { TemplateType } from './newTemplateSlice';

const AddName = () => {

  const dispatch = useDispatch();
  const template = useSelector(getNewTemplate);
  const [input, setInput] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);


  const cancel = () => {
    dispatch(setAddNameOpen({condition: false}));
    dispatch(setNewTemplateOpen({condition: false}));
  }


  const onSubmit = ((e: SyntheticEvent) => {
    e.preventDefault();
    if(!input) return setErrorOpen(true);
    dispatch(addName({name: input}))
    dispatch(setAddNameOpen({condition: false}))
    dispatch(setPaletteOpen({condition: true}))
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>Please enter a name for the template:</h3>
        <input onClick={() => setErrorOpen(false)} onChange={e => setInput(e.target.value)} type='text'></input>
        <input type='submit' value='Save'></input>
      </form>
      {errorOpen && <div>Please enter a name for your template!</div>}
      <button onClick={cancel} >Cancel</button>
      <h1> </h1>
    </>
  )
}

export default AddName