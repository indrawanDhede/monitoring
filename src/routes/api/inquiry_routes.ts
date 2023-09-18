import express from "express";
const routes = express.Router();
import InquiryController from "../../controllers/api/inquiry_controller";
import InquiryValidator from "../../validators/api/inquiry_validator";
import { validate } from "../../validators/validate";

routes.get("/inquiry", InquiryController.getInquiry);
routes.post(
  "/inquiry",
  InquiryValidator.postInquiryValidation(),
  validate,
  InquiryController.postInquiry
);
// routes.get("/inquiry/:id", inquiry_controller.findInquiry);

export default routes