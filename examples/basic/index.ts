import { createServer } from 'http';

import { jsonResult, mount, ProcessedRequest } from 'lacing';

const logger = { error: console.error, info: console.log, warn: console.warn };

const app = async (request: ProcessedRequest) => {
  console.log(request);

  return jsonResult({ body: { result: 'ok' }, statusCode: 200 });
};

createServer(mount(app, { logger })).listen(3000, () => {
  console.log('Listening on 3000...');
});
