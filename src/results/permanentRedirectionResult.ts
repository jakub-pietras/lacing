import { HttpResult } from '../httpResult';

export const permanentRedirectionResult = (url: string): HttpResult => ({
  headers: { location: url },
  statusCode: 301,
});
