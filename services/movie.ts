import { API_ACCESS_TOKEN, API_BASEURL, API_URL_CATEGORY } from "@env";
import axios from "axios";
import callAPI from "config/api";

const ROOT_BASEURL = API_BASEURL;
const ROOT_API_CATEGORY = API_URL_CATEGORY;
const ROOT_TOKEN = API_ACCESS_TOKEN;
export async function getMovieCategory() {
  const url = `${ROOT_API_CATEGORY}`;
  const data = {};
  return callAPI({
    url,
    method: "GET",
    data,
    accessToken: ROOT_TOKEN,
  });
}

export async function getMovieList(path: string) {
  const url = `${ROOT_BASEURL}/${path}`;
  const data = {};
  return callAPI({
    url,
    method: "GET",
    data,
    accessToken: ROOT_TOKEN,
  });
}
export async function getMovieDetail(id: string) {
  const url = `movie/${id}`;
  const response = await axios.get(`${ROOT_BASEURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${ROOT_TOKEN}`,
    },
  });
  const axiosResponse = response.data;
  return {
    responseData: axiosResponse,
  };
}

export async function getGenreList() {
  const url = `genre/movie/list`;
  const response = await axios.get(`${ROOT_BASEURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${ROOT_TOKEN}`,
    },
  });
  const axiosResponse = response.data.genres;
  return {
    responseData: axiosResponse,
  };
}

export async function getMovieByGenre(selectedGenre: number) {
  const url = `discover/movie?with_genres=${selectedGenre}`;
  const response = await axios.get(`${ROOT_BASEURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${ROOT_TOKEN}`,
    },
  });
  const axiosResponse = response.data.results;
  return {
    responseData: axiosResponse,
  };
}
