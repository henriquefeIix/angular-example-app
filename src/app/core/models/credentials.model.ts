import { User } from "./user.model";

export interface Credentials {
  accessToken: string;
  user: User;
}
