import { HttpResult } from '../httpResult';

type JsonResult = Omit<HttpResult, 'body'> & { body: Record<string, unknown> };

export const jsonResult = (result: JsonResult): HttpResult => ({
  ...result,
  body: JSON.stringify(result.body),
  headers: { ...result.headers, 'content-type': 'application/json' },
});
