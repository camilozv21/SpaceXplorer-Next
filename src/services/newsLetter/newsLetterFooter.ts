"use server"

import { NewsLetter } from "@/types/gravityForms.types";
import httpExternalApi from "../common/http.external.service";

export const newsLetter = async (values: { email: string }) => {
  try {
    const formData = new FormData();
    formData.append("input_14", values.email);

    return httpExternalApi.httpPost<NewsLetter>('/gf/v2/forms/5/submissions', formData);

  } catch (error) {
    console.log(error);
  }
}
