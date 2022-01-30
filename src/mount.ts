import { RequestListener } from 'http';

import { ProcessedRequest, processRequest } from './processRequest';
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
  (
    handler: (processedRequest: ProcessedRequest) => Promise<HttpResult>,
    { logger }: MountOptions
  ): RequestListener =>
  async (request, response) => {
    const processRequestResult = processRequest(request);

    if (processRequestResult.kind === 'left') {
      logger.error(`Request processing error - ${processRequestResult.error}`);
      return;
    }

    const processedRequest = processRequestResult.data;
    const handlerResult = await attemptAsync(() => handler(processedRequest));

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
