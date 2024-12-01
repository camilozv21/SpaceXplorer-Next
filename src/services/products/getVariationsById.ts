"use server"

import httpExternalApi from "../common/http.external.service";
import { cache } from "react";
import { Variation } from "@/types/variations.types";

export const getVariationsById = cache(async (id: number) => {
  
  try {
    const response = await httpExternalApi.httpGet<Variation>(`/variationsapi/v1/product/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
})