import React, { useState, SetStateAction, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { getAddNameOpen, setAddNameOpen, getPaletteOpen, setPaletteOpen } from './Templates/templatesSlice';
import { renderString } from '../Utilities/helpers';
import { getUser } from './userSlice'
import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';
import { getNewTemplate, TemplateType } from './Templates/TemplateEditor/newTemplateSlice';

interface TemplateEditorProps {
  existingTemplate?: TemplateType;
}

const TemplateEditor = ({ existingTemplate }: TemplateEditorProps) => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  let template = useSelector(getNewTemplate);
  const addNameOpen = useSelector(getAddNameOpen);
  const paletteOpen = useSelector(getPaletteOpen);

  if (existingTemplate) {
    console.log('existing template')
    template = existingTemplate
    dispatch(setAddNameOpen({ condition: false }));
    dispatch(setPaletteOpen({ condition: true }));
  }

  // const saveNewTemplate = () => {
  //   instance.post('/addTemplate', { user, template })
  //     .then(({ data }) => {
  //       setTemplates(data);
  //       setNewTemplateOpen(false);
  //     })
  // }

  return (
    <>

      {addNameOpen ? <AddName />
        :
        template.name && <>
          <h3>Name: {template.name}</h3>
          <button onClick={() => dispatch(setAddNameOpen({ condition: true }))}>Edit Name</button>
        </>
      }

      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}

      {paletteOpen && <EditorPalette />}
    </>
  )
}

export default TemplateEditor