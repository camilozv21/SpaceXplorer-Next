"use server"

import { Product } from "@/types/product.types";
import httpExternalApi from "../common/http.external.service";
import { Category } from "@/types/category.types";
import { cache } from "react";

type ProductsByCategoryResult = {
  products: Product[];
  category: Category;
};

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const getProductsByCategory = cache(async (category: string): Promise<ProductsByCategoryResult> => {
  try {
    const responseCategory = await httpExternalApi.httpGet<Category[]>(`/wc/v3/products/categories`, new URLSearchParams([['slug', category]]), accessToken);
    const responsePage1 = httpExternalApi.httpGet<Product[]>(`/wc/v3/products`, new URLSearchParams([['category', responseCategory[0].id.toString()], ['per_page', '100'], ['page', '1'], ['orderby', 'id']]), accessToken);
    const responsePage2 = httpExternalApi.httpGet<Product[]>(`/wc/v3/products`, new URLSearchParams([['category', responseCategory[0].id.toString()], ['per_page', '100'], ['page', '2'], ['orderby', 'id']]), accessToken);

    const [page1, page2] = await Promise.all([responsePage1, responsePage2]);

    return {products: [...page1, ...page2], category: responseCategory[0]};

  } catch (error) {
    console.log(error);
    return {products: [], category: {} as Category};
  }
})