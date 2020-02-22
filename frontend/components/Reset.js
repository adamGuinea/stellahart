import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import { useMutation } from "@apollo/react-hooks";
import useForm from "../lib/hooks/useForm";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import { PossibleFragmentSpreads } from "graphql/validation/rules/PossibleFragmentSpreads";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

function Reset({ resetToken }) {
  const { inputs, handleChange, resetForm } = useForm({
    password: "",
    confirmPassword: ""
  });

  const [resetPassword, { error, loading }] = useMutation(RESET_MUTATION, {
    variables: {
      resetToken,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await resetPassword();
        resetForm();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        {data && data.resetPassword && data.resetPassword.message}
        <Error error={error} />
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Your Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Reset Your Password</button>
      </fieldset>
    </Form>
  );
}

reset.propTypes = {
  resetToken: PropTypes.string.isRequired
};

export default Reset;
