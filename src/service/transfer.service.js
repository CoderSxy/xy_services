const connection = require('../app/database');

class TransferService {
  async getTransferFile(file_name) {
    let concatStr = file_name ? `WHERE file_name like '%${file_name}%'` : ``
    const statement = `SELECT * FROM common_db.sys_transfer_file ${concatStr} order by create_time desc;`;
    console.log(statement)
    const [result] = await connection.execute(statement);
    console.log(result)
    return result;
  }
  async recordTransferFile(file_name, create_by, create_time) {
    const statement = `SELECT * FROM common_db.sys_transfer_file WHERE file_name = '${file_name}';`;
    const [result] = await connection.execute(statement);
    if (result.length) { // 查询到了则更新
      const updateStatement = `UPDATE common_db.sys_transfer_file SET create_by = '${create_by}', create_time = '${create_time}' WHERE file_name = '${file_name}';`
      const [updateresult] = await connection.execute(updateStatement);
      return updateresult
    } else { // 未查询到则新增
      const addStatement = `INSERT INTO common_db.sys_transfer_file (file_name, create_by, create_time) VALUES ('${file_name}', '${create_by}', '${create_time}');`
      const [addresult] = await connection.execute(addStatement);
      return addresult
    }
  }
  async removeTransferFile(file_name) {
    const statement = `DELETE FROM common_db.sys_transfer_file WHERE file_name = '${file_name}';`;
    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new TransferService();