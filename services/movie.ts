import { API_ACCESS_TOKEN, API_URL } from "@env";
import callAPI from "config/api";

const ROOT_API = API_URL;
const ROOT_TOKEN = API_ACCESS_TOKEN;
export async function getMovieCategory() {
  const url = `${ROOT_API}`;
  const data = {};
  return callAPI({
    url,
    method: "GET",
    data,
    accessToken: ROOT_TOKEN,
  });
}

export async function getDetailMovie(id: string) {}
