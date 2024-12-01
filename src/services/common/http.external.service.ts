import { HttpBaseAPI } from "./http.service";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const API_URL = BASE_URL;
const API_PUBLIC_ENDPOINT = `/wp-json`;

class HttpExternalAPI extends HttpBaseAPI {
    constructor(){
        super(API_URL, API_PUBLIC_ENDPOINT)
    }
}

const httpExternalApi = new HttpExternalAPI();
export default httpExternalApi;