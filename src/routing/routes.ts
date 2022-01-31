import { match } from 'path-to-regexp';

import { Handler, RoutesHandler } from './types';
import { HttpResult } from '../httpResult';

export type RoutesHandlersMap = Record<string, RoutesHandler>;

export const routes = (
  handlers: RoutesHandlersMap,
  options?: { notFoundHandler?: Handler }
): RoutesHandler => {
  const parsedHandlers = Object.entries(handlers).map(([path, handler]) => ({
    handler,
    matchingFunction: match(path, {
      decode: decodeURIComponent,
      encode: encodeURI,
      end: false,
      sensitive: true,
    }),
  }));

  return async (request, currentPath): Promise<HttpResult> => {
    for (const { handler, matchingFunction } of parsedHandlers) {
      const result = matchingFunction(currentPath);

      if (result) {
        const remainingPath = currentPath.substring(result.path.length);
        const newParams = { ...request.params, ...result.params };

        return handler({ ...request, params: newParams }, remainingPath);
      }
    }

    return options?.notFoundHandler?.(request) ?? { statusCode: 404 };
  };
};
