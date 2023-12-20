import { useSelector } from 'react-redux';

import Template from './Templates/Template';

import { renderString } from '../Utilities/helpers'
import { getTemplates } from './Templates/templatesSlice';

const Templates = () => {

  const templates = useSelector(getTemplates);

  const mapped = templates.map((template, i) => {
    return (
      <Template index={i} string={renderString(template)} template={template} />
    )
  })

  return (
    <>
      <h1>Templates</h1>
      {templates.length > 0 && <div>{mapped}</div>}
      <h1> </h1>
    </>
  )
}

export default Templates