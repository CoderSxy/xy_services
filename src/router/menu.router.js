const Router = require("koa-router");
const { listmenu } = require("../controller/menu.controller");

const menuRouter = new Router({ prefix: "/menu" });

menuRouter.get("/list", listmenu);

module.exports = menuRouter;
