import { body, param } from "express-validator";
import { StatusActive } from "../../models/bank_model";

const postBankValidation = () => {
  return [
    body("namaBank")
      .notEmpty()
      .withMessage("Nama Bank tidak boleh kosong")
      .isLength({ max: 100 })
      .withMessage("Nama Bank maximal 100 karakter"),
    body("active")
      .isIn(Object.values(StatusActive))
      .withMessage("Status Active tidak valid"),
  ];
};

const paramBankValidator = () => {
   return [param("id").isInt().withMessage("Id bank harus berupa angka")];
}

const updateBankValidator = () => {
  return [
    param("id").isInt().withMessage("Id bank harus berupa angka"),
    body("namaBank")
      .notEmpty()
      .withMessage("Nama Bank tidak boleh kosong")
      .isLength({ max: 100 })
      .withMessage("Nama Bank maximal 100 karakter"),
    body("active")
      .isIn(Object.values(StatusActive))
      .withMessage("Status Active tidak valid"),
  ];
}

export default {
  postBankValidation,
  paramBankValidator,
  updateBankValidator,
};
