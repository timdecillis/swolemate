import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';

import { renderString } from '../Utilities/helpers';
import { getAddNameOpen, setAddNameOpen, getPaletteOpen, setPaletteOpen } from './Templates/templatesSlice';
import { TemplateType } from './Templates/TemplateEditor/newTemplateSlice';


interface TemplateEditorProps {
  existingTemplate?: TemplateType;
}

const TemplateEditor = ({ existingTemplate }: TemplateEditorProps) => {


  const dispatch = useDispatch();
  let [template, setTemplate] = useState<TemplateType>(existingTemplate  || {id: 0, name: '', string: [], variables: {}});

  const addNameOpen = useSelector(getAddNameOpen);
  const paletteOpen = useSelector(getPaletteOpen);


  if (existingTemplate) {
    template = existingTemplate
    dispatch(setAddNameOpen({ condition: false }));
    dispatch(setPaletteOpen({ condition: true }));
  }

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