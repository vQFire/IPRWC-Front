import {Role} from "./role";

export interface Jwt {
  sub: string
  roles: Role[]
  iss: string
  exp: number
}
