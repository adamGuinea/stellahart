import { useMutation, useQuery } from '@apollo/client';
import { NextApiRequest } from 'next';
import React from 'react';
import { IProduct } from '../interfaces';
import useForm from '../lib/useForm';
import { UPDATE_PRODUCT_MUTATION } from '../mutations';
import { SINGLE_PRODUCT_QUERY } from '../queries';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

interface IProps {
  id: string
}

export default function UpdateProduct(props: IProps) {
  const { id } = props;
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs?.name}
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
            value={inputs?.price}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs?.description}
          />
        </label>
        <button type="submit">+ Update Product</button>
      </fieldset>
    </Form>
  );
}
