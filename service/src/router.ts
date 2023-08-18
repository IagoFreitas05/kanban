import { Router } from "express";
import {auth} from "./app/useCases/users/Auth";

export const router = Router();

router.post("/login/", auth);


