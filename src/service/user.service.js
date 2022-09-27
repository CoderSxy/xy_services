const connection = require('../app/database');

class UserService {
  async create(user) {
    const { username, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [username, password]);

    return result[0];
  }

  // 根据username查询用户细腻
  async getUserByName(name) {
    const statement = `SELECT * FROM common_db.sys_user WHERE user_name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  // 根据userid 获取 roleids
  async getRolesByUserid(userid) {
    const statement = `SELECT * FROM common_db.sys_user_role WHERE user_id = ?;`;
    const result = await connection.execute(statement, [userid]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  // 使用userid 获取角色列表
  async getRoleListByUserid(userid) {
    const statement = `select * from common_db.sys_role where role_id in (SELECT role_id FROM common_db.sys_user_role where user_id = ?);`
    const result = await connection.execute(statement, [userid]);
    return result;
  }
  // 使用userid 获取对应permission列表
  async getPermsByUserid(userid) {
    // const statement = `select * from common_db.sys_menu where menu_id in 
    // (select menu_id from common_db.sys_role_menu where role_id in (SELECT role_id FROM common_db.sys_user_role where user_id = ?));`
    const statement = `select * from common_db.sys_menu where menu_id in 
      (select menu_id from common_db.sys_role_menu where role_id in 
      (SELECT role_id FROM common_db.sys_user_role where case when ? = '1' then '1'='1' else user_id = ? end ));`
    const res = await connection.execute(statement, [userid, userid]);
    const result = res.filter(item => item.menu_type !== 'F')
    return result;
  }
}



module.exports = new UserService();
