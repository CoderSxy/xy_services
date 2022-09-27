const Router = require("koa-router");
const { list,create,update,remove } = require("../controller/msgboard.controller");

const msgboardRouter = new Router({ prefix: "/msgboard" });

msgboardRouter.get("/list", list);
msgboardRouter.post("/create", create);
msgboardRouter.post("/update", update);
msgboardRouter.get("/remove", remove);

module.exports = msgboardRouter;
