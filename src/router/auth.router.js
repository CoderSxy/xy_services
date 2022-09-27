const Router = require('koa-router');

const authRouter = new Router();

const {
  login,
  success,
  getRoutes
} = require('../controller/auth.controller');
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

authRouter.post('/login', verifyLogin, login); 
authRouter.get('/getInfo', verifyAuth, success);
authRouter.get('/getRouters', getRoutes);

module.exports = authRouter;
