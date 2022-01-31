import { Handler, HandlerWithParams, ProcessedRequestWithParams } from './types';
import { HttpMethod } from '../httpTypes';
import { HttpResult } from '../httpResult';

type SupportedMethod = Extract<HttpMethod, 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'>;
export type MethodsHandlersMap = Partial<Record<SupportedMethod, HandlerWithParams>>;

export const methods = (handlers: MethodsHandlersMap, options?: { notFoundHandler?: Handler }) => {
  const getHandler = handlers.GET;
  const headHandler = getHandler ? { HEAD: handlers.GET } : undefined;

  const expandedHandlers = {
    ...handlers,
    ...headHandler,
  } as Partial<Record<string, HandlerWithParams>>;

  return async (request: ProcessedRequestWithParams): Promise<HttpResult> => {
    const handler = expandedHandlers[request.method];

    if (!handler) {
      return options?.notFoundHandler?.(request) ?? { statusCode: 404 };
    }

    return handler(request);
  };
};
