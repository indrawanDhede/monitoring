import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();

const USMAN_BASE_URL = process.env.USMAN_BASE_URL_DEV;

const Usman: AxiosInstance = axios.create({
  baseURL: USMAN_BASE_URL,
  timeout: 60000,
  timeoutErrorMessage: "Harap periksa kembali koneksi jaringan Anda.",
  headers: {
    Accept: "application/json",
  },
});

export default Usman;

export const USMAN_PATH = {
  TOKEN: "/check-token",
};
