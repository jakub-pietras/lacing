import { createServer } from 'http';

import { mount } from 'lacing';

const app = () => {};

createServer(mount(app)).listen(3000, () => {
  console.log('Listening on 3000...');
});
