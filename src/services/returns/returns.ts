"use server"

import { ReturnFormProps } from "@/modules/company/Returns/ReturnForm";
import httpExternalApi from "../common/http.external.service";
import { Returns } from "@/types/gravityForms.types";

export const returns = async (values: ReturnFormProps) => {
  try {
    const body = {
      input_1: values.name,
          input_2: values.email,
          input_4: values.phone,
          input_5: values.orderNumber,
          input_9: values.reasonForReturn,
    }

    return httpExternalApi.httpPost<Returns>('/gf/v2/forms/2/submissions', body);

  } catch (error) {
    console.log(error);
  }
}
