type ResultWrapper<T> = {
  result: T | null;
  err: string[] | null;
};

type ErrorData = {
  error: string;
  message: string[];
  statusCode: number;
};
