import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { CartItem } from './schemas/CartItem';
import { ProductImage } from './schemas/ProductImage';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';
import { sendPassowrdResetEmail } from './lib/mail';

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
	},
	passwordResetLink: {
		async sendToken(args) {
			await sendPassowrdResetEmail(args.token, args.identity)
		}
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
		url: databaseUrl,
		async onConnect(keystone) {
			if (process.argv.includes('--seed-data')) {
				await insertSeedData(keystone)
			}
		}
	},
	lists: createSchema({
		User,
		Product,
		ProductImage,
		CartItem
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