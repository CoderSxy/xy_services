const connection = require('../app/database');
class RankingService {
  async getRankingData(queryInfo) {
    const {role, level} = queryInfo

    let whereStr = ``
    whereStr = role ? whereStr + ` AND role like '%${role}%' ` : whereStr
    whereStr = level ? whereStr + ` AND level like '%${level}%' ` : whereStr
    const statement = `
      SELECT * FROM common_db.sys_ranking WHERE 1 = 1
      ${whereStr}
      ORDER BY CAST(ranking AS unsigned),CAST(sortid AS unsigned)
    `;
    const [result] = await connection.execute(statement);
    const res = { list: result, totalCount: result.length }
    return res;
  }
  async insertRankingData(reqInfo) {
    const queryStatement = `select max(sortid) as maxsortid from common_db.sys_ranking ;`
    const [result1] = await connection.execute(queryStatement);
    const maxsortid = result1[0].maxsortid+1
    const {ranking, username, role, score, desc='',level} = reqInfo
    const descinfo = '`desc`'
    const statement = `INSERT INTO common_db.sys_ranking (ranking, username, role, score, `+descinfo+`, level, sortid) VALUES
     ('${ranking}', '${username}', '${role}', '${score}', '${desc}', '${level}', '${maxsortid}');`
    const [result] = await connection.execute(statement);
    return result

  }
  async editRankingData(reqInfo) {
    const {ranking, username, role, score, desc='',level, id} = reqInfo
    
    const descinfo = '`desc`'
    const statement = `UPDATE common_db.sys_ranking SET ranking = '${ranking}', username = '${username}', role = '${role}', score = '${score}', `+descinfo+` = '${desc}', level = '${level}' WHERE id = ${id};`
    const [result] = await connection.execute(statement);
    return result
  }
  async deleteRankingData(reqInfo) {
    const {id} = reqInfo
    const statement = `DELETE FROM common_db.sys_ranking WHERE id = ${id};`
    const [result] = await connection.execute(statement);
    return result
  }

  async transferRanking(changeInfo) {
    const {preRow,nextRow} = changeInfo
    const update1Statement = `UPDATE common_db.sys_ranking SET sortid = '${preRow.sortid}' WHERE id = ${nextRow.id};`
    const [result1] = await connection.execute(update1Statement);
    const update2Statement = `UPDATE common_db.sys_ranking SET sortid = '${nextRow.sortid}' WHERE id = ${preRow.id};`
    const [result2] = await connection.execute(update2Statement);
    return result2
  }
  
}

module.exports = new RankingService();