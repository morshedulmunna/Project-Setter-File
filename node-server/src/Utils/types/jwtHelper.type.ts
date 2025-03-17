import {JwtPayload} from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    uid: string
    email: string
    role: string
}