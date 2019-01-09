const {forwardTo} = require('prisma-binding');
const {hasPermission} = require('../utils');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there is a current userId
        if(!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user(
            {
                where: {id: ctx.request.userId},
            },  
            info
        );
    },
    async users(parent, args, ctx, info) {
        // check if they're logged in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in!')
        }
        console.log(ctx.request.userId);
        // check if the user has the permissions to query users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])

        // query all the users
        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        // make sure they are logged in
        if(!ctx.request.userId) {
            throw new Error("You aren't logged in!");
        }
        // query the current users
        const order = await ctx.db.query.order(
            {
                where: {id: args.id},
            }, 
            info
        );
        // check if they have permission to see this order
        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = 
        ctx.request.user.permissions.includes("ADMIN");
        if(!ownsOrder && !hasPermissionToSeeOrder) {
            throw new Error("Sorry buddd you don't have permission");
        }
        // return the order
        return order;
    },
    async orders(parent, args, ctx, info) {
        const {userId} = ctx.request;
        if(!userId) {
            throw new Error("You must be signed in")
        }
        return ctx.db.query.orders({
            where: {
                user: {id: userId}
            }
        }, info)
    }
};

module.exports = Query;
