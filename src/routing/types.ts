import { HttpResult } from '../httpResult';
import { ProcessedRequest } from '../processRequest';

export type ProcessedRequestWithParams = ProcessedRequest & { params: Record<string, string> };
export type Handler = (request: ProcessedRequest) => Promise<HttpResult>;
export type HandlerWithParams = (request: ProcessedRequestWithParams) => Promise<HttpResult>;
export type RoutesHandler = (
  request: ProcessedRequestWithParams,
  currentPath: string
) => Promise<HttpResult>;
export type RoutesHandlersMap = Record<string, Handler>;
