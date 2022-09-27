const rankingService = require('../service/ranking.service');

class RankingController {
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const reqInfo = ctx.request.body
    // 2.将数据插入到数据库
    const result = await rankingService.insertRankingData(reqInfo);
    ctx.body = result;
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    // const { offset, size } = ctx.query;
    
    const {role = null,level = null} = ctx.query 
    const queryInfo = {role,level}
    // 2.查询列表
    const result = await rankingService.getRankingData(queryInfo);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    const reqInfo = ctx.request.body;
    // 2.修改内容
    const result = await rankingService.editRankingData(reqInfo);
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const reqInfo = ctx.query
    // 2.删除内容
    const result = await rankingService.deleteRankingData(reqInfo);
    ctx.body = result;
  }

  async transfer(ctx, next) {
    // 1.获取参数
    const reqInfo = ctx.request.body;
    // 2.修改内容
    const result = await rankingService.transferRanking(reqInfo);
    ctx.body = result;
  }


}

module.exports = new RankingController();