import { useEffect, useState } from 'react';


export default function useForm(
  initial = { name: '', description: '', price: '' }
) {
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).toString();

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

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
    const blankState = Object.fromEntries(
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
