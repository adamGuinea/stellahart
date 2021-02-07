import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || 'mongo://localhost/stellahart'

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360,
	secret: process.env.COOKIE_SECRET,

}

export default config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true
		}
	},
	db: {
		adapter: 'mongoose',
		url: databaseUrl,
		//add data seeding here later
	},
	lists: createSchema({
		//add schema items later
	}),
	ui: {
		//change this for roles later
		isAccessAllowed: () => true,
	}
	// add session values later
})