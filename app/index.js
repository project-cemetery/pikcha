const fastify = require('fastify')({ logger: true });
const swagger = require('fastify-swagger');
const cors = require('fastify-cors');

const { container } = require('./container');
const { setupSwagger } = require('./presentation/swagger');

const config = container.resolve('config');
fastify.register(swagger, setupSwagger('/docs', config));
fastify.register(cors);

const validationGuard = container.resolve('validationGuard');
validationGuard.hooks.forEach(({ hook, handle }) =>
  fastify.addHook(hook, handle),
);

const accessGuard = container.resolve('accessGuard');
accessGuard.hooks.forEach(({ hook, handle }) => fastify.addHook(hook, handle));

const controllers = [
  container.resolve('colorController'),
  container.resolve('lowresController'),
  container.resolve('indexController'),
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

    fastify.listen(3001, '0.0.0.0');
  } catch (error) {
    fastify.log.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};

start();
