"use server"

import { Product } from "@/types/product.types";
import httpExternalApi from "../common/http.external.service";
import { cache } from "react";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY; // remove next public when using use server
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const getProductBySlug = cache(async (slug: string) => {
  
  try {
    const response = await httpExternalApi.httpGet<Product[]>(`/wc/v3/products`, new URLSearchParams([['slug', slug]]), accessToken);

    return response[0];
  } catch (error) {
    console.log(error);
  }
})