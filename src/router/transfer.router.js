const Router = require("koa-router");
const { download, upload, list, fileremove, record } = require("../controller/transfer.controller");
const multer = require("koa-multer")
const transferRouter = new Router({ prefix: "/transfer" });
const path = require("path")
//上传配置
let storage = multer.diskStorage({
  destination: function(req, file, cb){
    // console.log(path.join(__dirname, "../../") + "/static/upload")
    // cb(null, path.join(__dirname, "../../") + "/static/upload")
    cb(null, "static/upload")
  },
  // 修改文件名配置
  filename: function(req, file, cb) {
    // let fileFormat = file.originalname.split(".")
    // cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
    // let fileFormat = file.originalname.split(".")
    cb(null, file.originalname)
  }
})
//加载配置
let uploadConfig = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024 
  }
})
transferRouter.get("/download/:name", download);
transferRouter.post("/upload", uploadConfig.single('file'), async (ctx, next) => {
  ctx.response.body = {
    code: 200,
    message: 'success'
  }
  ctx.response.header.code = 200
});
// transferRouter.post("/upload", upload);
transferRouter.post("/record", record)
transferRouter.get("/list", list)
transferRouter.get("/fileremove", fileremove)

module.exports = transferRouter;
