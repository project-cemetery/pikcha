const fastify = require('fastify')({ logger: true });
const swagger = require('fastify-swagger');
const cors = require('fastify-cors');

const { container } = require('./container');
const { setupSwagger } = require('./presentation/swagger');

const config = container.resolve('config');
fastify.register(swagger, setupSwagger('/docs', config));
fastify.register(cors);

const accessGuard = container.resolve('accessGuard');
accessGuard.hooks.forEach(({ hook, handle }) => fastify.addHook(hook, handle));

const controllers = [
  container.resolve('colorController'),
  container.resolve('lowresController'),
];
controllers.forEach(({ path, docs, handle }) => {
  fastify.get(path, docs, handle);
});

const start = async () => {
  try {
    fastify.ready((err) => {
      if (err) throw err;
      fastify.swagger();
    });

    await fastify.listen(3001, '0.0.0.0');

    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};

start();
