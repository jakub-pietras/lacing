import { RequestListener } from 'http';
import { attemptAsync, matchWith } from './either';

import { HttpResult } from './httpResult';
import { writeResponse } from './writeResponse';

export type MountOptions = {
  logger: {
    error: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
  };
};

export const mount =
  (handler: () => Promise<HttpResult>, { logger }: MountOptions): RequestListener =>
  async (request, response) => {
    const handlerResult = await attemptAsync(() => handler());

    const safeResult = matchWith(handlerResult, {
      right: (value) => value,
      left: (error): HttpResult => {
        logger.error(`Uncaught exception - ${error}`);
        return { statusCode: 500 };
      },
    });

    const writeResult = writeResponse(request, response, safeResult);

    matchWith(writeResult, {
      left: (error) => {
        logger.error(`Response write error - ${error}`);
      },
      right: () => {},
    });
  };
