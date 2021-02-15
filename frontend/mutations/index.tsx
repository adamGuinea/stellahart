import gql from 'graphql-tag';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
mutation UPDATE_PRODUCT_MUTATION(
  $id: ID!
  $name: String
  $description: String
  $price: Int
){
  updateProduct(
    id: $id
    data: {
      price: $price
      description: $description
      name: $name
    }
  ) {
    id
    price
    description
    name
  }
}
`;
