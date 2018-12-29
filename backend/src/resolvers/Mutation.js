const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async createItem (parent, args, ctx, info) {
        // TODO: check if they're logged in

        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    ...args,
                },
            }, 
            info
        );

        console.log(item);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        // take a copy of updates
        const updates = { ...args };
        // remove ID from updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                },
            }, 
            info
        );
    },
    async deleteItem(parent, args, ctx, info){
        const where = { id: args.id };
        // 1, find the item
        const item = await  ctx.db.query.item({where}, `{ id title}`);
        // 2. check if they own the item or have permissions
       
        // 3. delete it
        return ctx.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        // hash password
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                ...args,
                password,
                permissions: {set: ['USER']},
                },
            }, 
            info
        );
        // create jwt token for them 
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
            ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365,
            });
        // return to browser
        return user;
    },
};

module.exports = Mutations;
