const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
const userService = require("../service/user.service");
class AuthController {
  async login(ctx, next) {
    const { user_id:id, user_name:username } = ctx.user;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    ctx.body = { id, username, token }
  }

  async success(ctx, next) {
    // ctx.body.message = "授权成功~";
    // ctx.body.code = "200"
    // ctx.body = "授权成功~";
    const result = await userService.getUserByName(ctx.user.username);
    const user = result[0]; // 从这里获取name 和 avatar
    // 1使用id 获取对应角色信息，
    const roleResult = await userService.getRoleListByUserid(ctx.user.id)
    const roleList = roleResult[0]

    // 2使用id 获取对应权限信息
    const menuResult = await userService.getPermsByUserid(ctx.user.id)
    const menuList = menuResult[0]

    ctx.body = {code: 200, msg: "授权成功~", roleList, menuList, user: {userName: user.user_name, avatar: user.avatar, userid: user.user_id}}
  }

  async getRoutes(ctx, next) {
    // 2使用id 获取对应权限信息
    const menuResult = await userService.getPermsByUserid('1')
    const menuList = menuResult[0]
    ctx.body = {code:200, data: menuList}

  }
}

function buildMenus(list,level = 0) {
  const routers = []
  for(let item of list) {
    const router = {}
    if(item.visible === '1'){
      router.hidden = item.visible
    }
    router.name = item.path[0].toUpperCase() + item.path.substr(1)
    // router.path = 
  }
}

module.exports = new AuthController();
