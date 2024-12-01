"use server"

import { Warranty } from "@/types/gravityForms.types";
import httpExternalApi from "../common/http.external.service";
import { FormValues } from "@/modules/company/Warranty/WarrantyForm";

export const warranty = async (values: FormValues) => {
  const date = new Date(values.dateOfPurchase);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  try {
    const body = {
      input_1: values.name,
      input_2: values.email,
      input_4: values.phone,
      input_5: values.address,
      input_9: values.placeOfPurchase,
      input_10: formattedDate,
      input_11: values.warrantyIssue,
    }

    return httpExternalApi.httpPost<Warranty>('/gf/v2/forms/1/submissions', body);

  } catch (error) {
    console.log(error);
  }
}
