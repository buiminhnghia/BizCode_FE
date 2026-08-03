/** Khớp với BaseResponse<T> ở backend (BizCore.Shared/DataTransferObjects/Base.cs). */
export interface BaseResponse<T = unknown> {
  code?: string;
  type: string;
  message?: string;
  records?: number;
  totalPages?: number;
  data?: T;
  isSuccess: boolean;
  value2?: string;
}
