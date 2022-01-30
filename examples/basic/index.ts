import { createServer } from 'http';

import { jsonResult, mount } from 'lacing';

const logger = { error: console.error, info: console.log, warn: console.warn };

const app = async () => jsonResult({ body: { result: 'Ok' }, statusCode: 200 });

createServer(mount(app, { logger })).listen(3000, () => {
  console.log('Listening on 3000...');
});
