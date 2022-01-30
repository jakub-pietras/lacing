import { parse as parseCookies } from 'cookie';
import { IncomingHttpHeaders, IncomingMessage } from 'http';
import qs, { ParsedQs } from 'qs';
import { URL } from 'url';

import { Either, left, right } from './either';

type PatchedIncomingMessage = IncomingMessage & {
  socket: IncomingMessage['socket'] & { encrypted: boolean };
};

export type ProcessedRequest = {
  cookies: Record<string, string>;
  headers: IncomingHttpHeaders;
  method: string;
  protocol: 'http' | 'https';
  url: Omit<URL, 'searchParams' | 'toJSON' | 'toString'> & { query: ParsedQs };
};

export const processRequest = (
  originalRequest: IncomingMessage
): Either<ProcessedRequest, { message: string }> => {
  const request = originalRequest as unknown as PatchedIncomingMessage;

  if (!request.url) {
    return left({ message: 'Missing request url' });
  }

  if (!request.method) {
    return left({ message: 'Missing request method' });
  }

  const cookies =
    request.headers.cookie && request.headers.cookie !== ''
      ? parseCookies(request.headers.cookie)
      : {};

  const protocol =
    request.headers['x-forwarded-proto'] === 'https' || request.socket.encrypted ? 'https' : 'http';

  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  const query =
    parsedUrl.search !== '' ? qs.parse(parsedUrl.search, { ignoreQueryPrefix: true }) : {};

  return right({
    cookies,
    headers: { ...request.headers },
    method: request.method,
    protocol,
    url: {
      hash: parsedUrl.hash,
      host: parsedUrl.host,
      hostname: parsedUrl.hostname,
      href: parsedUrl.href,
      origin: parsedUrl.origin,
      password: parsedUrl.password,
      pathname: parsedUrl.pathname,
      port: parsedUrl.port,
      protocol: parsedUrl.protocol,
      query,
      search: parsedUrl.search,
      username: parsedUrl.username,
    },
  });
};
