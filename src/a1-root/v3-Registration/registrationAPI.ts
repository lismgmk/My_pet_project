import axios from "axios";

const instance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const registrationAPI = {
  register(email: string, password: string) {
    return instance.post("auth/register", {
      email,
      password,
    });
  },
};
