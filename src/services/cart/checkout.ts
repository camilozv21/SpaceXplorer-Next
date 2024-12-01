"use server"

import { CartProduct, Checkout } from "@/types/cart.types";
import httpExternalApi from "../common/http.external.service";

export const checkout = async (body: { products: CartProduct[], state: string, total: number, coupon: string, key: string | null }) => {
  try {

    return httpExternalApi.httpPost<Checkout>('/buy/v1/result', body);

  } catch (error) {
    console.log(error);
  }
}
