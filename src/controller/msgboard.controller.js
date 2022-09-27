const msgboardService = require('../service/msgboard.service');

class MomentController {
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const reqInfo = ctx.request.body
    // 2.将数据插入到数据库
    const result = await msgboardService.insertMsgboardData(reqInfo);
    ctx.body = result;
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    // const { offset, size } = ctx.query;
    const queryInfo = ctx.query
    // 2.查询列表
    const result = await msgboardService.getMsgboardData(queryInfo);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    const reqInfo = ctx.request.body;
    // 2.修改内容
    const result = await msgboardService.editMsgboardData(reqInfo);
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const reqInfo = ctx.query
    // 2.删除内容
    const result = await msgboardService.deleteMsgboardData(reqInfo);
    ctx.body = result;
  }
}

module.exports = new MomentController();