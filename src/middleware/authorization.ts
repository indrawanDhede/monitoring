import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import CustomError from "./error_handler";
import { checkTokenUsman } from "../services/usman";
import { getPegawaiByEmail } from "../services/hrd";
import { DataTokenParam } from "../services/usman/types";

interface HeaderAuth extends IncomingHttpHeaders {
  idUser?: string;
  kodeGroup?: string;
  tokenLama?: string;
  tokenBaru?: string;
}

type UserAuth = {
  id: number;
  email: string;
  api_token: string;
  is_login: boolean;
}

type PegawaiAuth = {
  nip: string;
  TrxUnitKerjaPegawais: {
    Unit: {
      kode_unit_baru: string;
      kode_unit: string;
      nama_unit: string;
    };
  }[];
}

type UserData = {
  idUser: number;
  nip: string;
  email: string;
  apiToken: string;
  isLogin: boolean;
  kodeUnit: string;
  kodeUnitLama: string;
  namaUnit: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserData;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    user: UserData
  }
}

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id_user, kode_group, token_lama, token_baru }: HeaderAuth =
      req.headers;
      
    if (!id_user || !kode_group || !token_lama || !token_baru) {
      throw new CustomError(401, "Unauthorized");
    }

    if (
      typeof token_lama === "string" &&
      token_lama.split(" ")[0] === "Bearer"
    ) {
      throw new CustomError(401, "Unauthorized");
    }

    const data: DataTokenParam = {
      id_user: parseInt(id_user as string, 10),
      kode_group: kode_group as string,
      token: token_baru as string,
    };

    const [user, errorUsman]: [UserAuth, string] = await checkTokenUsman(
      data,
      token_lama as string
    );

    if (errorUsman) {
      throw new CustomError(401, errorUsman);
    }

    if (!user || !user.email) {
      throw new CustomError(401, "User tidak ditemukan");
    }

    if (!req.session || !req.session.user) {
      const [pegawai, errorHrd]: [PegawaiAuth, string] =
        await getPegawaiByEmail(user.email);
      if (errorHrd) {
        throw new CustomError(401, errorHrd);
      }
      
      const userData: UserData = {
        idUser: user.id,
        nip: pegawai.nip,
        email: user.email,
        apiToken: user.api_token,
        isLogin: user.is_login,
        kodeUnit: pegawai.TrxUnitKerjaPegawais[0].Unit.kode_unit_baru,
        kodeUnitLama: pegawai.TrxUnitKerjaPegawais[0].Unit.kode_unit,
        namaUnit: pegawai.TrxUnitKerjaPegawais[0].Unit.nama_unit,
        // ...pegawai,
      };
      req.session.user = userData;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default authorization;
