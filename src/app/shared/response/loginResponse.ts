import {User} from "../models/user.model";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
}
