"use server"

import { LogedUser, Login, User } from "@/types/auth.types";
import httpExternalApi from "../common/http.external.service";

const USERNAME_AUTH = process.env.USERNAME_AUTH;
const PASSWORD_AUTH = process.env.PASSWORD_AUTH;
const accessToken = btoa(`${USERNAME_AUTH}:${PASSWORD_AUTH}`);

interface FormSignUpValues {
  email: string;
  username: string;
  password: string;
}

export const signUp = async (body: FormSignUpValues) => {
  try {
    return httpExternalApi.httpPost<User>('/wp/v2/users', body, accessToken);
  } catch (error) {
    console.log(error);
  }
}

export const login = async (body: { username: string, password: string }) => {
  try {
    return httpExternalApi.httpPost<Login>('/jwt-auth/v1/token', body);
  } catch (error) {
    console.log(error);
  }
}

export const getUserInfo = async (id: string) => {
  try {
    return httpExternalApi.httpGet<LogedUser>(`/wp/v2/users/${id}`, new URLSearchParams(), accessToken);
  } catch (error) {
    console.log(error);
  }
}
