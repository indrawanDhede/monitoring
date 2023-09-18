import express from "express";
const routes = express.Router();
import bankController from "../../controllers/api/bank_controller";
import BankValidator from "../../validators/api/bank_validator";
import { validate } from "../../validators/validate";

routes.get("/bank", bankController.getBank);
routes.get("/bank/:id", BankValidator.paramBankValidator(), validate, bankController.getBankById);
routes.post("/bank", BankValidator.postBankValidation(), validate, bankController.postBank);
routes.put("/bank/:id", BankValidator.updateBankValidator(), validate, bankController.updateBank);
routes.delete(
  "/bank/:id",
  BankValidator.paramBankValidator(),
  validate,
  bankController.deleteBank
);

export default routes;
