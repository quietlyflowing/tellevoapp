export interface ApiResponse {
    code: number;
    message: string;
    token?: string;
    data?: object;
  }