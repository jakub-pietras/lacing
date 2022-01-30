import { HttpResult } from '../httpResult';

export const temporaryRedirectionResult = (url: string): HttpResult => ({
  headers: { location: url },
  statusCode: 302,
});
