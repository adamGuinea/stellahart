import { User } from '../generated/graphql';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';

export default function Cart() {
	const me: User = useUser()
	return <CartStyles open>{me?.email}</CartStyles>
}
