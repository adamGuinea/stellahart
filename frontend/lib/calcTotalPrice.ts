import { CartItem } from "../generated/graphql"

export const calcTotalPrice = (cart: CartItem[]) => {
	return cart?.reduce((tally, cartItem) => {
		if(!cartItem.product) return tally;
		return tally + cartItem.quantity! * cartItem.product?.price!
	},0)
}