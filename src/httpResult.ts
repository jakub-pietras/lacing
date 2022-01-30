import { HttpStatusCode } from './httpTypes';

export type HttpResult = {
  body?: string;
  headers?: Record<string, string>;
  statusCode: HttpStatusCode;
};
