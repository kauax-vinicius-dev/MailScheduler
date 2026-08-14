import { Router } from "express";
import { EmailController } from "../controllers/EmailController.js";

const routes = Router();

routes.post("/email", EmailController.registerEmail);

routes.delete("/email", EmailController.deleteEmail);

export default routes;