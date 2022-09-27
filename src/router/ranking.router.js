const Router = require("koa-router");
const { list,create,update,remove,transfer } = require("../controller/ranking.controller");
const {
  verifyAuth
} = require('../middleware/auth.middleware');
const rankingRouter = new Router({ prefix: "/ranking" });

rankingRouter.get("/list", list);
rankingRouter.post("/create", verifyAuth,create);
rankingRouter.post("/update",verifyAuth, update);
rankingRouter.get("/remove",verifyAuth, remove);
rankingRouter.post("/transfer",verifyAuth, transfer);

module.exports = rankingRouter;
