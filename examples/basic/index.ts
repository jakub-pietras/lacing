import { createServer } from 'http';
import { andThen, pipe, tap } from 'ramda';

import { HttpResult, jsonResult, methods, mount, ProcessedRequest, router, routes } from 'lacing';

const logger = { error: console.error, info: console.log, warn: console.warn };

const logRequest = tap(async (request: ProcessedRequest) => {
  logger.info(`${request.method} ${request.url.pathname}`);
});

const logResult = tap(({ statusCode }: HttpResult) => {
  logger.info(`=> ${statusCode}`);
});

const appRouter = router(
  routes({
    '/example/:param': routes({
      '/deep/:deepParam': methods({
        GET: async ({ cookies, params }) =>
          jsonResult({ body: { cookies, params }, statusCode: 200 }),
      }),
    }),
  })
);

const app = pipe(logRequest, appRouter, andThen(logResult));

createServer(mount(app, { logger })).listen(3000, () => {
  console.log('Listening on 3000...');
});
