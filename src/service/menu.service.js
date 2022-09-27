const connection = require('../app/database');

class MenuService {
  async getRoutesByRoles(roles) {
    const rolesArr = roles.split(',')
    // 1 先根据role_id 查询出对应的menu_id ; 2 再用menu_id去查询对应的menu
    const statement = `select * from common_db.sys_menu where menu_id in(SELECT menu_id FROM common_db.sys_role_menu where role_id in (?)) order by menu_id`;
    const [result] = await connection.query(statement, [rolesArr]);
    // 3 将数据转换成路由
    const parentMenus = result.filter( item => item.parent_id === 0)
    const Menus = parentMenus.map( item => {
      const obj = {}
      obj.alwaysShow = true
      obj.component = 'Layout'
      obj.hidden = !(item.visible==0)
      obj.meta = { title: item.menu_name, icon: item.icon, noCache: !!item.is_cache, link: null}
      const tmpPathArr = [...item.path]
      tmpPathArr[0] = tmpPathArr[0].toUpperCase()
      obj.name = tmpPathArr.join('')
      obj.path = '/'+item.path
      obj.redirect = 'noRedirect'
      const children = result.filter(it => it.parent_id === item.menu_id).map( child => {
        const resChild = {}
        resChild.component = child.component
        resChild.hidden = !(child.visible==0)
        resChild.meta = { title:child.menu_name, icon: child.icon, noCache: !!child.is_cache, link: null}
        const tempNameArr = [...child.path]
        tempNameArr[0] = tempNameArr[0].toUpperCase()
        resChild.name = tempNameArr.join('')
        resChild.path = '/'+child.path
        return resChild
      })
      obj.children = children
      return obj
    })
    
    return Menus;
  }

  async getMenuidByRoles(roles) {
    let concatStr = roles ? `WHERE file_name like '%${roles}%'` : ``
    const statement = `SELECT * FROM sxy_db.t_transfer_file ${concatStr} order by create_time desc;`;
    const [result] = await connection.execute(statement);
    return result;
  }
  async getMenusByMenuid(file_name) {
    let concatStr = file_name ? `WHERE file_name like '%${file_name}%'` : ``
    const statement = `SELECT * FROM sxy_db.t_transfer_file ${concatStr} order by create_time desc;`;
    const [result] = await connection.execute(statement);
    return result;
  }

}

module.exports = new MenuService();