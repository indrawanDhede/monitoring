import { Request, Response, NextFunction } from "express";
import Bank, { StatusActive } from "../../models/bank_model";
import { responseSuccess } from "../../utils/response_success";
import CustomError from "../../middleware/error_handler";

const getBank = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bank : Bank[] = await Bank.findAll({
      where: {
        active: StatusActive.Active,
      },
    });

    responseSuccess(res, bank)
  } catch (error) {
    next(error)
  }
};

const getBankById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const bank: Bank | null = await Bank.findByPk(id);

    if (!bank) {
      throw new CustomError(404, "data tidak ditemukan.");
    }

    responseSuccess(res, bank);
  } catch (error) {
    next(error)
  }
};

const postBank = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { namaBank, active } = req.body;

    const newBank: Bank = await Bank.create({
      namaBank: namaBank,
      active: active,
    });

    if (!newBank) {
      throw new CustomError(404, "gagal membuat data.");
    }

    responseSuccess(res, newBank);
  } catch (error) {
    next(error);
  }
};

const updateBank = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { id } = req.params;
    const { namaBank, active } = req.body;

    const bank : Bank | null = await Bank.findByPk(id);
    if (!bank) {
      throw new CustomError(404, "data tidak ditemukan.");
    }

    bank.namaBank = namaBank;
    bank.active = active;

    const response = bank.save();
    if (!response) {
      throw new CustomError(400, "gagal mengupdate data.");
    }

    responseSuccess(res, bank)
  }catch(error){
    next(error)
  }
}

const deleteBank = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { id } = req.params;

    const bank : Bank | null = await Bank.findByPk(id);
    if (!bank) {
      throw new CustomError(404, "data tidak ditemukan.");
    }

    const response = bank.destroy();
    if (!response) {
      throw new CustomError(400, "gagal menghapus data.");
    }

    responseSuccess(res, [])
  }catch(error){
    next(error)
  }
}

export default {
  getBank,
  getBankById,
  postBank,
  updateBank,
  deleteBank,
};
