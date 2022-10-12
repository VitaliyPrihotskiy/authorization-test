import { UserType } from "../constants/user-type.constant";

export interface SuccessResponse {
  first_name: string,
  last_name: string,
  role: string | UserType.Admin | UserType.User,
  token: string,
}


