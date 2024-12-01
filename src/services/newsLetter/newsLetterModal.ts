"use server"

import { NewsLetter } from "@/types/gravityForms.types";
import httpExternalApi from "../common/http.external.service";

export const newsLetter = async (values: { email: string , firstName: string, lastName: string, typeOfUser: string}) => {
  try {
    const formData = new FormData();
    formData.append("input_1", values.firstName);
    formData.append("input_12", values.lastName);
    formData.append("input_14", values.email);
    formData.append("input_13", values.typeOfUser);

    return httpExternalApi.httpPost<NewsLetter>('/gf/v2/forms/5/submissions', formData);

  } catch (error) {
    console.log(error);
  }
}
