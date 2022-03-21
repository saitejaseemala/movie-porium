import axios from "axios";

const movieApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default movieApi;
