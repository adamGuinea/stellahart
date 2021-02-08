import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImage';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';

const databaseUrl = process.env.DATABASE_URL

const sessionConfig = {
	maxAge: 3600,
	secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		// add initial roles later
	}
})

export default withAuth(config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true
		}
	},
	db: {
		adapter: 'mongoose',
		url: databaseUrl
	},
	lists: createSchema({
		User,
		Product,
		ProductImage
	}),
	ui: {
		isAccessAllowed: ({ session }) => {
			return !!session?.data
		},
	},
	session: withItemData(statelessSessions(sessionConfig), {
		User: `id`
	})
}))