import { RequestListener } from 'http';

export const mount =
  (handler: () => void): RequestListener =>
  (_, response) => {
    handler();

    response.end();
  };
