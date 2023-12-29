import { SetStateAction, useEffect, useState } from 'react';

import AddName from './Templates/TemplateEditor/AddName';
import EditorPalette from './Templates/TemplateEditor/EditorPalette';

import { renderString } from '../Utilities/helpers';
import { TemplateType } from './Templates/TemplateEditor/newTemplateSlice';


type TemplateEditorProps = {
  existingTemplate?: TemplateType;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
}

const TemplateEditor = ({ existingTemplate, setEditOpen }: TemplateEditorProps) => {

  const [template, setTemplate] = useState<TemplateType>(existingTemplate || { id: 0, name: '', string: [], variables: {} });
  const [addNameOpen, setAddNameOpen] = useState<boolean>(true);
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    if (existingTemplate) {
      setTemplate(existingTemplate);
      setAddNameOpen(false);
      setPaletteOpen(true);
    };
  }, [existingTemplate])

  return (
    <>
      {addNameOpen ? <AddName template={template} setTemplate={setTemplate} setAddNameOpen={setAddNameOpen} setPaletteOpen={setPaletteOpen} />
        :
        template.name && <>
          <h3>Name: {template.name}</h3>
          <button onClick={() => setAddNameOpen(true)}>Edit Name</button>
        </>
      }
      {template.string.length > 0 && <div>Template content: {renderString(template)}</div>}
      {paletteOpen && <EditorPalette setPaletteOpen={setPaletteOpen} setEditOpen={setEditOpen} setTemplate={setTemplate} template={template} />}
    </>
  )
}

export default TemplateEditor