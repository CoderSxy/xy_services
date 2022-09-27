// const transferService = require("../service/transfer.service");
const transferService = require('../service/transfer.service');
const send = require("koa-send");
const fs = require("fs");
const path = require("path");
const contentDisposition = require('content-disposition')
const deleteFolderRecursive = function (url, name) {
  let files = []
  if (fs.existsSync(url)) { // 判断给定的路径是否储存在
    files = fs.readdirSync(url) // 返回文件和子目录数组
    files.forEach((file, index) => {
      let curPath = path.join(url, file)
      if (fs.statSync(curPath).isDirectory()) { // 判断目录是否是文件夹
        deleteFolderRecursive(curPath, name)
      } else {
        if (file.indexOf(name) > -1) { //是否是指定删除的文件
          fs.unlinkSync(curPath)
          console.log("删除文件:"+curPath)
        }
      }
    })
  } else {
    console.log("给定的删除的路径不存在")
  }
}

class TransferController {
  async download(ctx, next) {
    const name = ctx.params.name;
    const path = `static/upload/${name}`; 
    try {
      ctx.setHeader('Content-Disposition', contentDisposition(path)) // 设置下载文件名编码 but trycatch报没有方法 大哥不管了
      ctx.attachment(path);
    } catch (error) {
      // console.log(error) 
    }
    await send(ctx, path);
  }
  async upload(ctx, next) {
    const file = ctx.request.body.files.file; // 获取上传文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    // const ext = file.name.split(".").pop(); // 获取上传文件扩展名
    const upStream = fs.createWriteStream(`static/upload/${file.name}`); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    return (ctx.body = "上传成功");
  }
  async record(ctx, next) {
    const { file_name, create_by, create_time } = ctx.request.body
    const result = await transferService.recordTransferFile(file_name, create_by, create_time)
    ctx.body = result;
  }
  async list(ctx, next) {
    const { file_name } = ctx.query;
    const result = await transferService.getTransferFile(file_name);
    ctx.body = result;
  }
  async fileremove(ctx, next) {
    const { name } = ctx.query
    try {
      deleteFolderRecursive(path.join(__dirname, "../../") + "/static/upload", name)
    } catch (error) {
      console.log(error)
    }
    await transferService.removeTransferFile(name)
    ctx.response.body = {
      code: 200,
      message: 'success'
    }
    ctx.response.header.code = 200
  }
}

module.exports = new TransferController();
