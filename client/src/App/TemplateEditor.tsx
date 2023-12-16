import React, { useState, SetStateAction, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { getAddNameOpen, setAddNameOpen, getPaletteOpen } from './Templates/templatesSlice';
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
  const template = useSelector(getNewTemplate);
  const addNameOpen = useSelector(getAddNameOpen);
  const paletteOpen = useSelector(getPaletteOpen);
  // const [template, setTemplate] = useState<TemplateType>(existingTemplate ? existingTemplate : { id: 0, name: '', variables: {}, string: [] });

  // if (existingTemplate) {
  //   dispatch(setAddNameOpen(false));
  //   setPaletteOpen(true);
  // }

  // const addExistingVariableToString = (name: string) => {
  //   let previousString = template.string;
  //   setTemplate(prevTemplate => ({
  //     ...prevTemplate,
  //     string: [...previousString, [name]]
  //   }));
  // }

  // const saveNewTemplate = () => {
  //   instance.post('/addTemplate', { user, template })
  //     .then(({ data }) => {
  //       setTemplates(data);
  //       setNewTemplateOpen(false);
  //     })
  // }

  return (
    <>

      {addNameOpen ? <AddName/>
        :
        <>
          <h3>Name: {template.name}</h3>
          <button onClick={() => dispatch(setAddNameOpen({condition: true}))}>Edit Name</button>
        </>}

      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}

      {paletteOpen && <EditorPalette/>}
    </>
  )
}

export default TemplateEditor