import { useMutation } from '@apollo/client';
import React from 'react';
import useForm from '../lib/useForm';
import { CREATE_PRODUCT_MUTATION } from '../mutations';
import { ALL_PRODUCTS_QUERY } from '../queries';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    price: 0,
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{query: ALL_PRODUCTS_QUERY}],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
