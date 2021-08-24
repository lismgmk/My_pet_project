import {instance} from "../login-api/loginAPI";


// api
export const forgotAPI = {
    forgot(data: ForgotType) {
        return instance.post<ForgotResponseType>("auth/forgot", data);
    },
    setNewPassword(data: SetType) {
        return instance.post<ForgotResponseType>("auth/set-new-password", data);
    },
};


// types
export type ForgotType = {
    email: string
    from: string
    message: string
};

export type ForgotResponseType = {
    info: string
    error: string
};
export type SetType = {
    password: string
    resetPasswordToken: string
};



