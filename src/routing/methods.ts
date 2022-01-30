import { HttpMethod } from '../httpTypes';
import { HttpResult } from '../httpResult';
import { ProcessedRequest } from '../processRequest';

type SupportedMethod = Extract<HttpMethod, 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT'>;
type Handler = (request: ProcessedRequest) => Promise<HttpResult>;
export type MethodsHandlersMap = Partial<Record<SupportedMethod, Handler>>;

export const methods =
  (handlers: MethodsHandlersMap, notFoundHandler?: Handler) =>
  async (request: ProcessedRequest): Promise<HttpResult> => {
    const handler = (handlers as Partial<Record<string, Handler>>)[request.method];

    if (!handler) {
      return notFoundHandler?.(request) ?? { statusCode: 404 };
    }

    return handler(request);
  };
