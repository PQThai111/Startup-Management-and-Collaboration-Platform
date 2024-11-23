export interface ErrorResponse<Data> {
  status: boolean;
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  status: boolean;
  message: string
  data: Data
}

export interface ErrorrResponse {
  status: boolean;
  message: string;
  errors: string[];
}

export interface AxiosError {
  code: string;
  message: string;
  status: number;
  response: {
    data: ErrorrResponse;
  };
}

// -? loại bỏ undefined của key optional
// handle?
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}