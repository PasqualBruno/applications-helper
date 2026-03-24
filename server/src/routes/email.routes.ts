import { Router } from "express";
import EmailController from "../controller/EmailController.js";

const emailRouter = Router();

emailRouter.post("/send", (req, res) => EmailController.send(req, res));
emailRouter.get("/test", (req, res) => {});

export default emailRouter;
