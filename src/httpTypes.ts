type MethodRfc7231 = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';
type MethodRfc5789 = 'PATCH';

type StatusCodeRfc7231 =
  | 100
  | 101
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 426
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505;

export type HttpMethod = MethodRfc5789 | MethodRfc7231;
export type HttpStatusCode = StatusCodeRfc7231;
