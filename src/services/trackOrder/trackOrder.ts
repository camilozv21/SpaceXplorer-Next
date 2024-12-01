"use server"

import { TrackOrder } from "@/types/trackOrder.types";
import httpExternalApi from "../common/http.external.service";
import { cache } from "react";

const API_CONSUMER_KEY = process.env.WOOCOMMERCE_API_CONSUMER_KEY;
const API_CONSUMER_SECRET = process.env.WOOCOMMERCE_API_CONSUMER_SECRET;
const accessToken = btoa(`${API_CONSUMER_KEY}:${API_CONSUMER_SECRET}`);

export const trackOrder = cache(async (order: string) => {
  
  try {
    const response = await httpExternalApi.httpGet<TrackOrder>(`/wc/v3/orders/${order}`, new URLSearchParams([]), accessToken);

    return response;
  } catch (error) {
    console.log(error);
  }
})