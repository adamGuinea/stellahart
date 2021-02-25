import { ApolloCache, FetchResult, InMemoryCache, MutationFunctionOptions, MutationUpdaterFn, NormalizedCacheObject, useMutation } from '@apollo/client';
import { NextApiResponse } from 'next';
import React from 'react';
import { DELETE_PRODUCT_MUTATION } from '../mutations';

interface IProps {
  children: string;
  id: string;
}

const update: MutationUpdaterFn = (cache: ApolloCache<any>, payload: FetchResult): void => {
	cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct(props: IProps) {
  const { children, id } = props;
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update: update,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <button
      disabled={loading}
			type="button"
      onClick={() => {
        if (confirm('Are you sure?')) {
          deleteProduct(id).catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
