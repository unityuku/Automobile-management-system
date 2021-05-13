// 'use strict';

// const Controller = require('egg').Controller;

// class UserController extends Controller {
//     async index() {
//         const { ctx } = this //this指向的是controller控制在
//         const { username } = ctx.query //qurey接受前端给的东西  比如说说url后的?后面的参数
//         ctx.body = username
//     }

//     async getid() {
//         const { ctx } = this
//         const { id } = ctx.params //前端用params的方式传的话 可以拿到  比如说/getid/:id
//         ctx.body = id

//     }
//     async add() {
//         const { ctx } = this
//         // const { title, content } = ctx.request.body //前端以posst接口请求的方式传参 
//         const { title, content } = await ctx.service.user.user()
//         console.log(title);
//         ctx.body = {
//             title,
//             content
//         }
//     }

// }

// module.exports = UserController