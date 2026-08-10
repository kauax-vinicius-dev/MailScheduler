import { Router } from "express";
import { EmailController } from "../controllers/EmailController.js";

const routes = Router();

routes.post("/register-email", EmailController.registerEmail);

routes.delete("/delete-email", EmailController.deleteEmail);

export default routes;