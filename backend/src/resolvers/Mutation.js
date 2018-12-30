const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');

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
    async signin(parent, {email, password}, ctx, info) {
        // 1. check if there is a user with that email
        const user = await ctx.db.query.user({where: {email}});
            if(!user) {
                throw new Error(`No such user found for email ${email}`);
            }
        // 2. check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new Error('Invalid password');
        }
        // 3. generate the jwt
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 5. Return the user
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'};
    },
    async requestReset(parent, args, ctx, info) {
        // 1. check if this is a real user
        const user = await ctx.db.query.user({where: {email: args.email}});
        if(!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }
        // 2. set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() * 3600000; 
        const res = ctx.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry}
        });
        console.log(res);
        return {message: 'Thanks!'};
        // 3. email user the reset token
    },
};

module.exports = Mutations;
