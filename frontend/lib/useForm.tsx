import { any } from 'prop-types';
import { ChangeEvent, useState } from 'react';

interface IFormInput {
  name: string;
  price?: number;
  image?: string;
  description?: string;
}

export default function useForm(initial: IFormInput) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e: any) {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function clearForm() {
    const blankState: any = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  function resetForm() {
    setInputs(initial);
  }

  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  };
}
