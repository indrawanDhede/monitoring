import express, { NextFunction, Request, Response } from "express";
import Inquiry from "../../models/inquiry_model";
import Bank from "../../models/bank_model";
import { briTransfer } from "../../services/bri";
import { Transaction } from "sequelize";
import db from "../../config/database";
import { responseSuccess } from "../../utils/response_success";
import CustomError from "../../middleware/error_handler";

const getInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiry: Inquiry[] = await Inquiry.findAll({
      attributes: ["kodeRef", "status", "ucr", "uch"],
      include: {
        model: Bank,
        as: "bank",
      },
      order: [["udcr", "DESC"]],
    });
    
    responseSuccess(res, inquiry);
  } catch (error) {
    next(error);
  }
};

const postInquiry = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    if (!req.session.user) {
      throw new CustomError(401, "Unauthorized");
    }

    const nip: string  = req.session.user.nip;

    const { kodeRef, idBank, status } = req.body;

    const bank: Bank | null = await Bank.findByPk(idBank);
    
    if(!bank){
      throw new CustomError(404, "Id bank tidak ditemukan.");
    }
    const inquiry: Inquiry | null = await Inquiry.findOne({
      where: {
        kodeRef: kodeRef
      }
    })

    if (inquiry) {
      throw new CustomError(400, "kode ref sudah ada.");
    }

    const newInquiry: Inquiry = await Inquiry.create({
      kodeRef: kodeRef,
      idBank: idBank,
      status: status,
      ucr: nip,
      uch: nip
    })

    if (inquiry) {
      throw new CustomError(400, "gagal membuat data.");
    }

    responseSuccess(res, newInquiry)
  }catch(error){
    next(error)
  }
}

const findInquiry = async(
  req: Request,
  res: Response,
  next: express.NextFunction
): Promise<void> => {
  try{
    const { id } = req.params;

    const transaction: Transaction = await db.transaction();

    try{
      const inquiry: Inquiry | null = await Inquiry.findOne({
        where: {
          kodeRef: id,
        },
        attributes: ["kodeRef", "status", "ucr", "uch"],
        include: {
          model: Bank,
          as: "bank",
        },
        transaction,
      });

      if (!inquiry) {
        throw new CustomError(404, "data tidak ditemukan.");
      }

      // cek table trx status where max id
      // jika success atau data masih kosong maka buat data trx baru dengan status pending, lanjut proses berikutnya..
      // jika status pending return gagal

      // di setiap api bank harus ada pengecekan by unique key jika trx ini sudah pernah ada
      const [result, error] = await briTransfer(inquiry);
      if (error) {
        throw new CustomError(404, error.message);
      }

      // jika api failed return gagal
      // jika api success update data trx baru status success

      // buat api trigger bank ketika status pending
      
      await transaction.commit();
      responseSuccess(res, result);
    }catch(error){
      await transaction.rollback();
      next(error);
    }
  }catch(error){
    next(error);
  }
};


export default {
  getInquiry,
  postInquiry,
  findInquiry
}
