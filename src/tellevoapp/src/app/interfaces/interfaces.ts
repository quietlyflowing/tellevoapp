export interface VehicleData {
  userId: number;
}

export interface UserData {
  userId: number;
  nombre: string;
  telefono: string;
  createdAt: String;
  updatedAt: String;
  hash?: string
  url?: string
}


export interface ApiData {
  id: number;
  email: string;
  IS_DRIVER: number;
  created_at: String;
  updated_at: String;
  datos: UserData;
  vehicle?: VehicleData;
}

export interface ApiResponse {
    code: number;
    message: string;
    token?: string;
    data?: ApiData;
  }

export interface DataGetResponse {
  code: number;
  message: string;
  data: ApiData;
}

export interface PasswordAuthData{
  url: string;
  hash: string;
}

export interface CheckQuestionResponse {
  code: number;
  message: string;
  data: PasswordAuthData;
}