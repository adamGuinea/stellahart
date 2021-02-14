import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { SINGLE_ITEM_QUERY } from '../queries';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  justify-content: center;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }: any) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: id },
  });

  const { Product } = data ? data : [];

  if (loading) {
    <p>Loading...</p>;
  }
  if (error) {
    <DisplayError error={error} />;
  }

  return (
    <ProductStyles>
      <Head>
        <title>Stellahart | {Product?.name}</title>
      </Head>
      <img
        src={Product?.photo?.image?.publicUrlTransformed}
        alt={Product?.photo?.altText}
      />
      <div className="details">
        <h2>{Product?.name}</h2>
        <p>{Product?.description}</p>
      </div>
    </ProductStyles>
  );
}
