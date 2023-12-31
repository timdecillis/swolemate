import axios from 'axios';

import { TemplateType } from '../App/Templates/TemplateEditor/newTemplateSlice';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

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

export const saveNewTemplate = async (user: string, template: TemplateType): Promise<string> => {
  const response = await instance.post('/addTemplate', { user, template });
  return response.data;
}

export const getTemplates = async (user: string) => {
  const response = await instance.get(`/getUserTemplates?user=${user}`);
  return response;
}

export const deleteLast = (template: TemplateType) => {
  let string = [...template.string];
  string.pop();
  return template = {...template, string};
}