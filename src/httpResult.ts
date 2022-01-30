export type HttpResult = {
  body?: string;
  headers?: Record<string, string>;
  statusCode: StatusCodeRfc7231;
};

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
