const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');
const {transport, makeANiceEmail} = require('../mail');

const Mutations = {
    async createItem (parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    user: {
                        connect: {
                            id: ctx.request.userId,
                        },
                    },
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
        // create the user in the database
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
        const resetTokenExpiry = Date.now() + 3600000; 
        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry}
        });
        // 3. email user the reset token
        const mailRes = await transport.sendMail({
            from :'adamguinea22@gmail.com',
            to: user.email,
            subject: 'Your Password Reset Token',
            html: makeANiceEmail(`Your Password Reset Token is Here! 
            \n\n 
            <a href="${process.env
                .FRONTEND_URL}/reset?resetToken=${resetToken}
                ">Click Here To Reset</a>`),
        })
        return {message: 'Thanks!'};
    },
    async resetPassword(parent, args, ctx, info) {
        // 1. check if the passwords match
        if(args.password !== args.confirmPassword) {
            throw new Error("Your passwords don't match!")
        }
        // 2. check if its a legit reset token
        // 3. check if its expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        });
        if(!user) {
            throw new Error('This token is invalid or expired');
        }
        // 4. hash their new password
        const password = await bcrypt.hash(args.password, 10);
        // 5. save the new password to the user and remove old
        // resetToken fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        // 6. generate JWT
        const token = jwt.sign({userId: updatedUser.id},
        process.env.APP_SECRET);
        // 7. set the jwt cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 8. return the new user
        return updatedUser;
    }

};

module.exports = Mutations;
