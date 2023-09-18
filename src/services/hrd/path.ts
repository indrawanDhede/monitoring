import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();

const HRD_BASE_URL = process.env.HRD_BASE_URL_DEV;

const Hrd: AxiosInstance = axios.create({
  baseURL: HRD_BASE_URL,
  timeout: 60000,
  timeoutErrorMessage: "Harap periksa kembali koneksi jaringan Anda.",
  headers: {
    Accept: "application/json",
  },
});

export default Hrd;

export const HRD_PATH = {
  PEGAWAI_BY_EMAIL: "/pegawai/email",
};
