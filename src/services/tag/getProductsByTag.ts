"use server"

import { Product } from "@/types/product.types";
import httpExternalApi from "../common/http.external.service";
import { cache } from "react";
import { Tag } from "@/types/tag.types";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const getProductsByTag = cache(async (tag: string) => {
  try {
    const tagInfo = await httpExternalApi.httpGet<Tag[]>(`/wc/v3/products/tags`, new URLSearchParams([['slug', tag === 'whats-new' ? 'new' : tag]]), accessToken);

    const products = await httpExternalApi.httpGet<Product[]>(`/wc/v3/products`, new URLSearchParams([['tag', tagInfo[0].id.toString()], ['per_page', '100'], ['page', '1']]), accessToken);

    return products;
  } catch (error) {
    console.log(error);
  }
})