"use server"

import httpExternalApi from "../common/http.external.service";
import { cache } from "react";
import { Review } from "@/types/reviews.types";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const getReviewsById = cache(async (id: number) => {
  
  try {
    const response = await httpExternalApi.httpGet<Review[]>(`/wc/v3/products/reviews`, new URLSearchParams([['product', id.toString()]]), accessToken);

    return response;
  } catch (error) {
    console.log(error);
  }
})