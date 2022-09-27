const menuService = require('../service/menu.service');

class MenuController {

  async listmenu(ctx, next) {
    // 1.获取数据(offset/size)
    // const { offset, size } = ctx.query;
    const roles = ctx.query.roles
    // 2.查询列表
    const result = await menuService.getRoutesByRoles(roles);
    ctx.body = result;
  }

  // 待使用
  async list(ctx, next) {
    // 1.获取数据(offset/size)
    // const { offset, size } = ctx.query;
    const queryInfo = ctx.query
    // 2.查询列表
    const result = await menuService.getMsgboardData(queryInfo);
    ctx.body = result;
  }


}

module.exports = new MenuController();