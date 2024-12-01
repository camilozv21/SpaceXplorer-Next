"use server"

import { OpticsArticle } from "@/types/opticsUniversityArtcle.types";
import httpExternalApi from "../common/http.external.service";
import { cache } from "react";

export const getArticle = cache(async (article: string) => {
  
  try {
    const response = await httpExternalApi.httpGet<OpticsArticle[]>(`/wp/v2/posts`, new URLSearchParams([['slug', article]]));

    return response[0];
  } catch (error) {
    console.log(error);
  }
})