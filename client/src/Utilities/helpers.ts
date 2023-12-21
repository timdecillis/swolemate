import axios from 'axios';

import { TemplateType } from '../App/Templates/TemplateEditor/newTemplateSlice';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});


export const updateTemplate = (oldValue: string, newValue: string, user: string) => {
  instance.put('/updateTemplate', { oldValue, newValue, user })
    .then(({ data }) => {
      // setTemplates(data)
    })
}

export const deleteTemplate = (id: string, user: string | null) => {
  instance.delete('/deleteTemplate', { data: { id, user } })
    .then(({ data }) => {
      // setTemplates(data);
    })
}

export const renderString = (template: TemplateType) => {
  return template.string.map((part: (string | string[])) => {
    if (Array.isArray(part)) {
      return template.variables[part[0]];
    }
    return part;
  }).join(' ');
}

export const saveNewTemplate = (user, template) => {
  instance.post('/addTemplate', { user, template })
    .then(({ data }) => {
      console.log('DATA FROM API:', data)
      setTemplates(data);
      setNewTemplateOpen(false);
    })
}