import React, { SetStateAction, SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface TemplateProps {
  index: number;
  template: string;
  deleteTemplate: (value: string) => void;
}

const Template = ({ template, index, deleteTemplate }: TemplateProps) => {

  return (
    <div key={index}>
    <h3>{index + 1}.) {template}</h3>
    <button>Edit</button>
    <button onClick={() => {
      deleteTemplate(template)
    }} >X</button>
  </div>
  )
}

export default Template