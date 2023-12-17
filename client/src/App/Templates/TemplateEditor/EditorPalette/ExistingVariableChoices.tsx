import { useSelector, useDispatch } from 'react-redux';

import { setNewVariableOpen } from '../../templatesSlice';
import { getNewTemplate, addExistingVariable } from '../newTemplateSlice';

const Variables = () => {

  const dispatch = useDispatch();
  const template = useSelector(getNewTemplate);

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
                  dispatch(addExistingVariable({ name: tuple[0] }));
                  dispatch(setNewVariableOpen({ condition: false }));
                }} >Insert</button>
              </div>
            );
          })}
          <h4>~Or~</h4>
        </>
      )}
    </>
  )
}

export default Variables