import { fastify } from "fastify";

const app = fastify({ logger: true});

app.get('/hello', (req, res) => {
  res.send({ message: 'Hello World!!' });
})

export { app };