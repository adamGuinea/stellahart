import { useMutation } from '@apollo/client';
import { SIGN_OUT_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY } from '../queries';

export default function SignOut() {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
