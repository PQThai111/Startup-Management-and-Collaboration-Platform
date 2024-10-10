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

// -? loại bỏ undefined của key optional
// handle?
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}