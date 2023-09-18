import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();

const BRI_BASE_URL = process.env.BRI_BASE_URL_DEV;

const BankBRI: AxiosInstance = axios.create({
  baseURL: BRI_BASE_URL,
  timeout: 60000,
  timeoutErrorMessage: "Harap periksa kembali koneksi jaringan Anda.",
  headers: {
    Accept: "application/json",
  },
});

export default BankBRI;

export const BRI_PATH = {
  TOKEN: "/check-token",
  TRANSFER: "/transfer",
};
