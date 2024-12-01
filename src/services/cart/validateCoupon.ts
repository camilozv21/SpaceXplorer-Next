"use server"

import { Coupon } from "@/types/cart.types";
import httpExternalApi from "../common/http.external.service";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const validateCoupon = async (code: string) => {
  try {

    return httpExternalApi.httpGet<Coupon[]>('/wc/v3/coupons', new URLSearchParams([['code', code]]), accessToken);

  } catch (error) {
    console.log(error);
  }
}
