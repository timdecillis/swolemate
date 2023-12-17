import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getNewTemplate } from './newTemplateSlice';
import EditVariable from './EditVariable';

const Variables = () => {

  const [editVariableOpen, setEditVariableOpen] = useState<boolean>(false);
  const [variable, setVariable] = useState<string[]>([]);

  const template = useSelector(getNewTemplate);

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
    <div>
      <h3>Variables</h3>
      {variables}
      {editVariableOpen && <EditVariable variable={variable} setEditVariableOpen={setEditVariableOpen} />}
    </div>
  )
}

export default Variables

