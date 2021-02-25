import { useMutation } from '@apollo/client';
import React, { FormEvent } from 'react';
import useForm from '../lib/useForm';
import { REQUEST_RESET_MUTATION, SIGN_UP_MUTATION } from '../mutations';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signUp, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signUp().catch((error) => console.error(error));
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            Success! Check your email for a password reset link
          </p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
