const fs  = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();
 

const main = async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./public/index.html');
}
const list = async (ctx, next) => {
  console.log('接收请求-list');
  ctx.body='列表页';
 }
 const item = async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body=`详情页${id}`;
 }
 const xml = async (ctx, next) => {
   ctx.type = 'xml';
   ctx.body = '<data>Hello World</data>'
 }
const json = async (ctx, next) => {
  ctx.type = 'json';
  ctx.body = {name:'fang'}
}
 const templateHtml = async (ctx, next) => {
   ctx.type = 'html';
   ctx.body = fs.createReadStream('./public/index.html')
 }
const redirect = async (ctx, next) => {
  ctx.redirect('/list')
}
const throws = (ctx, next) => {
  console.log('接收请求-throws');  
  ctx.throw(502);
}
const page404 =  (ctx, next) => {
  ctx.status = 404;
  ctx.body = '页面未找到'
}
const page500 =  (ctx, next) => {
  ctx.throw(500);
}
router.get('/', main)
      .get('/list', list)
      .get('/list/:id', item)
      .get('/xml', xml)
      .get('/json', json)
      .get('/template', templateHtml)
      .get('/redirect', redirect)
      .get('/throws', throws)
      .get('/404', page404)
      .get('/500', page500)
      .get('*', page404)

app.use(router.routes());
app.use(router.allowedMethods());
// app.use(cors());
app.on('error', (err, ctx) =>
  console.error('server error', err)
);
app.listen(7100)
console.log('listen 7100')