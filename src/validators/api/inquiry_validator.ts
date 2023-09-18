import { body} from "express-validator";
import { StatusInquiry } from "../../models/inquiry_model";

const postInquiryValidation = () => {
  return [
    body("kodeRef")
      .notEmpty()
      .withMessage("Kode ref tidak boleh kosong")
      .isInt()
      .withMessage("kode ref harus angka"),
    body("idBank")
      .notEmpty()
      .withMessage("Id bank tidak boleh kosong")
      .isInt()
      .withMessage("Id bank harus angka"),
    body("status")
      .isIn(Object.values(StatusInquiry))
      .withMessage("Status Inquiry tidak valid"),
  ];
};

export default {
  postInquiryValidation,
};
