import {instance, LoginResponseType, UserDataType} from "../login-api/loginAPI";


// api
export const authAPI = {
    me() {
        return instance.post<LoginResponseType>("auth/me", {});
    },
    logout() {
        return instance.delete<LogoutType>("auth/me", {});
    },
    updateUserData(data: UpdateUserDataType) {
        return instance.put<UpdateUserDataResponseType>("auth/me", data);
    },
};


// types
export type LogoutType = {
    info: string
    error: string
};
export type UpdateUserDataType = {
    name: string
    avatar: string
};
type UpdateUserDataResponseType = {
    updatedUser: UserDataType
    error?: string
};

