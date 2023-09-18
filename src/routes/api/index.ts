import express from "express";
const routes = express.Router();
import bankRoutes from "./bank_routes";
import inquiryRoutes from "./inquiry_routes";

// API WITH VERSION
routes.use("/v1", bankRoutes);
routes.use("/v1", inquiryRoutes);

export default routes;
