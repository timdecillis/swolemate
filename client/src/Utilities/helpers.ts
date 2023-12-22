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

export const deleteTemplate = async (id: number, user: string | null) => {
  const response = await instance.delete('/deleteTemplate', { data: { id, user } });
  return response.data;
}

export const renderString = (template: TemplateType) => {
  return template.string.map((part: (string | string[])) => {
    if (Array.isArray(part)) {
      return template.variables[part[0]];
    }
    return part;
  }).join(' ');
}

export const saveNewTemplate = (user: string, template: TemplateType): Promise<string> => {
  return instance.post('/addTemplate', { user, template })
    .then(({ data }) => {
      console.log('DATA FROM API:', data)
      return data;
    })
}

export const getTemplates = async (user: string) => {
  const response = await instance.get('/getUserTemplates', { data: user });
  console.log('helper data:', response);
  return response;
}