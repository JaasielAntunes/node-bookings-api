import { app } from './app.js';

const PORT = process.env.PORT || 3330;

const start = (() => {
  try {
    app.listen({ port: PORT, host: 'localhost' });
    app.log.info(`Servidor rodando na porta: http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});

start();
