import { ApolloCache, BaseMutationOptions, useMutation } from '@apollo/client';
import { IPageProps, IProduct } from '../interfaces';
import { DELETE_PRODUCT_MUTATION } from '../mutations';

interface IProps {
  children: React.HTMLProps<HTMLButtonElement>;
  id: string;
}

function update<T>(cache, payload) {
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
      onClick={() => {
        if (confirm('Are you sure?')) {
          deleteProduct(id).catch((err) => alert(err.message));
        }
      }}
      type="button"
    >
      {children}
    </button>
  );
}
