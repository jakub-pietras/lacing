import etag from 'etag';
import { IncomingMessage, ServerResponse } from 'http';

import { Either, left, right } from './either';
import { HttpResult } from './httpResult';

export const writeResponse = (
  request: IncomingMessage,
  response: ServerResponse,
  { body, headers = {}, statusCode }: HttpResult
): Either<{}, { message: string }> => {
  if (response.writableEnded) {
    return left({ message: 'Response already written' });
  }

  Object.entries(headers).forEach(([name, value]) => {
    response.setHeader(name, value);
  });

  if (!body) {
    response.statusCode = statusCode;
    response.end();
    return right({});
  }

  const bodyEtag = etag(body);
  const requestEtag = request.headers['if-none-match'];
  const supports304 = statusCode === 200 && (request.method === 'GET' || request.method === 'HEAD');

  if (supports304 && requestEtag === bodyEtag) {
    response.setHeader('etag', bodyEtag);
    response.statusCode = 304;
    response.end();
    return right({});
  }

  if (!headers['content-type']) {
    response.statusCode = 500;
    response.end();
    return left({ message: 'Response body provided without content type header' });
  }

  response.statusCode = statusCode;
  response.setHeader('content-length', body.length);
  response.setHeader('etag', bodyEtag);
  response.end(request.method === 'HEAD' ? undefined : body);

  return right({});
};
