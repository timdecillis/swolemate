import { useState } from 'react';

import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';

import { renderString } from '../Utilities/helpers';
import { TemplateType } from './Templates/TemplateEditor/newTemplateSlice';


interface TemplateEditorProps {
  existingTemplate?: TemplateType;
}

const TemplateEditor = ({ existingTemplate }: TemplateEditorProps) => {

  const [template, setTemplate] = useState<TemplateType>(existingTemplate  || {id: 0, name: '', string: [], variables: {}});
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  if (existingTemplate) {
    setTemplate(existingTemplate);
    setAddNameOpen(false);
    setPaletteOpen(true);
  }

  return (
    <>
      {addNameOpen ? <AddName setAddNameOpen={setAddNameOpen} setPaletteOpen={setPaletteOpen} />
        :
        template.name && <>
          <h3>Name: {template.name}</h3>
          <button onClick={() => setAddNameOpen(true)}>Edit Name</button>
        </>
      }
      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}
      {paletteOpen && <EditorPalette />}
    </>
  )
}

export default TemplateEditor