import { Router } from "express";
import {auth} from "./app/useCases/users/Auth";
import {createCard} from "./app/useCases/cards/CreateCard";
import {authorize} from "./app/middlewares/authorize";

export const router = Router();

router.post("/login/", auth);
router.post("/cards/", authorize, createCard);


