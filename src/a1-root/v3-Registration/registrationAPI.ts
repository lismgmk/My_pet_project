import {instance} from "../../api/login-api/loginAPI";


export const registrationAPI = {
  register(email: string, password: string) {
    return instance.post("auth/register", {
      email,
      password,
    });
  },
};
