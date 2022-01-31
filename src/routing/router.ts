import { HttpResult } from '../httpResult';
import { ProcessedRequest } from '../processRequest';
import { RoutesHandler } from './types';

export const router =
  (handler: RoutesHandler) =>
  (request: ProcessedRequest): Promise<HttpResult> =>
    handler({ ...request, params: {} }, request.url.pathname);
