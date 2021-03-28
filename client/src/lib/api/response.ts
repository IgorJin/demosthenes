interface ResponseError {
  message: string;
  reason?: string;
}

export interface Response<T> {
  error: ResponseError[] | null,
  result: T | null,
}