import {IUser} from '../response/IUser'
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}