const connection = require('../app/database');
const dayjs = require('dayjs');
class MsgboardService {
  async getMsgboardData(queryInfo) {
    const {msg_title, msg_content, create_by} = queryInfo
    const offset = queryInfo.offset ? queryInfo.offset : false
    const size = queryInfo.size ? queryInfo.size : false
    const limitStr = offset&&size ? `LIMIT ${offset}, ${size}` : ''
    let whereStr = ``
    whereStr = msg_title ? whereStr + ` AND msg_title like '%${msg_title}%' ` : whereStr
    whereStr = msg_content ? whereStr + ` AND msg_content like '%${msg_content}%' ` : whereStr
    whereStr = create_by ? whereStr + ` AND create_by like '%${create_by}%' ` : whereStr
    const statement = `
      SELECT * FROM sxy_db.t_messageboard WHERE 1 = 1
      ${whereStr}
      ORDER BY id
      ${limitStr};
    `;

    const [result] = await connection.execute(statement, [offset, size]);
    const res = { list: result, totalCount: result.length }
    return res;
  }
  async insertMsgboardData(reqInfo) {
    const {msg_title, msg_content, create_by, create_ip='0.0.0.0'} = reqInfo
    const update_time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const statement = `INSERT INTO sxy_db.t_messageboard (msg_title, msg_content, create_by, create_ip, update_time) VALUES ('${msg_title}', '${msg_content}', '${create_by}', '${create_ip}', '${update_time}');`
    const [result] = await connection.execute(statement);
    return result

  }
  async editMsgboardData(reqInfo) {
    const {id, msg_title, msg_content, create_by, create_ip='0.0.0.0'} = reqInfo
    const update_time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const statement = `UPDATE sxy_db.t_messageboard SET msg_title = '${msg_title}', msg_content = '${msg_content}', create_by = '${create_by}', create_ip = '${create_ip}', update_time = '${update_time}' WHERE id = ${id};`
    const [result] = await connection.execute(statement);
    return result
  }
  async deleteMsgboardData(reqInfo) {
    const {id} = reqInfo
    const statement = `DELETE FROM sxy_db.t_messageboard WHERE id = ${id};`
    const [result] = await connection.execute(statement);
    return result
  }
  
}

module.exports = new MsgboardService();