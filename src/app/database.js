const mysql = require("mysql2");

const config = require("./config");

const connections = mysql.createPool({
  // host: "101.132.159.41",
  host: config.MYSQL_HOST,
  // connectionLimit: 10,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: "Qq545231960",
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败:", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

module.exports = connections.promise();
