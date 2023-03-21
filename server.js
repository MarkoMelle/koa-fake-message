const Koa = require('koa');
const Router = require('koa-router');
const faker = require('faker/locale/ru');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();
app.use(cors());


function createMessage() {
  return {
    id: faker.datatype.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    received: faker.date.recent().getTime(),
  };
}

router.get('/messages/unread', (ctx) => {

  ctx.body = {
    status: 'ok',
    timestamp: Date.now(),
    messages: createMessage(),
  };
});

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(7070);
console.log('Server is running on port 7070');
