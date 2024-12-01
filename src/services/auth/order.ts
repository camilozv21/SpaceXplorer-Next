"use server"

import { Order } from "@/types/order.types";
import httpExternalApi from "../common/http.external.service";
import { cache } from "react";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const getOrdersByCustomer = cache(async (id: number) => {
  try {
    const orders = await httpExternalApi.httpGet<Order[]>(`/wc/v3/orders`, new URLSearchParams([['customer', id.toString()]]), accessToken);

    return orders;

  } catch (error) {
    console.log(error);
  }
})