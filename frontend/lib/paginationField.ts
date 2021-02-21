import { mergeDeep } from "@apollo/client/utilities"
import { PAGINATION_QUERY } from "../queries";

export const paginationField = () => {

	return {
		keyArgs: false,
		read(existing = [], { args, cache }) {
			const { skip, first } = args;
			const data = cache.readQuery({
				query: PAGINATION_QUERY
			});

			const count = data?._allProductsMeta?.count;
			const page = skip / first + 1;
			const pages = Math.ceil(count / first);

			const items = existing.slice(skip, skip + first).filter(x => x);

			// if there are items but there aren't enough to cover a full
			// page / how many were requested.
			// and we're on the last page, just send it.
			if (items.length && items.length !== first && page === pages) {
				return items;
			}

			if (items.length !== first) {
				return false
			}

			if (items.length) {
				return items;
			}

			return false;
		},
		merge(existing, incoming, { args }) {
			const { skip, first } = args;
			const merged = existing ? existing.slice(0) : []
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			return merged;
		}
	}
}