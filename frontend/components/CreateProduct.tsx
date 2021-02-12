import React from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    price: 0,
  });

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            onChange={handleChange}
            value={inputs.price}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
