import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { IAddToCartProps } from '../interfaces';
import { CURRENT_USER_QUERY } from '../queries';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }: IAddToCartProps) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button disabled={loading} type="button" onClick={() => addToCart()}>
      Add{loading && 'ing'} To Cart 🛍
    </button>
  );
}
