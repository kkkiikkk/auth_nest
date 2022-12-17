/**
 * Interface used in transform interceptor
 */
export interface Response<T> {
  data: T;
}

/**
 * Interface used in empty response
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyResponse {}
