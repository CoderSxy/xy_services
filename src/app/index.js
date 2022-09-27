const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle");
const useRoutes = require("../router");
const cors = require('koa2-cors')
// 文件传输部分
const path = require("path");
const router = require("koa-router")();
// const koaBody = require("koa-body");
const static = require("koa-static");


const app = new Koa();
app.use(cors());
/* 
  koa-body 对应的API及使用 看这篇文章 http://www.ptbird.cn/koa-body.html
  或者看 github上的官网 https://github.com/dlau/koa-body
  用 koa-body 中间件来处理文件上传，它可以将请求体拼到 ctx.request 中
*/
// 可上传 文件名取不到
// app.use(
//   koaBody({
//     multipart: true, // 支持文件上传
//     formidable: {
//       uploadDir: path.join(__dirname, '../../' , '/static/upload/'),
//       maxFieldsSize: 200 * 1024 * 1024, // 最大文件为200兆
//       keepExtensions: true,
//       multipart: true, // 是否支持 multipart-formdate 的表单
//       onFileBegin:(name,file) => {
//         console.log(name,file)
//         file.path = path.join(__dirname, '../../' , '/static/upload/') + file.name
//       }
//     },
//   })
// );
app.useRoutes = useRoutes;


app.use(bodyParser());
app.useRoutes();
app.on("error", errorHandler);





app.use(static(path.join(path.resolve(__dirname, "../../") + "/static"))); // 设置静态文件目录
app.use(router.allowedMethods());

module.exports = app;
