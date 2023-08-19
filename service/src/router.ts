import { Router } from "express";
import { auth } from "./app/useCases/users/Auth";
import { createCard } from "./app/useCases/cards/CreateCard";
import { authorize } from "./app/middlewares/authorize";
import { deleteCard } from "./app/useCases/cards/DeleteCard";
import { listCards } from "./app/useCases/cards/ListCards";
import { changeCard } from "./app/useCases/cards/ChangeCard";
import { logAction } from "./app/middlewares/logAction";

export const router = Router();

router.post("/login/", auth);
router.post("/cards/", authorize, createCard);
router.delete("/cards/:id", [authorize, logAction], deleteCard);
router.get("/cards/", authorize, listCards);
router.put("/cards/:id/", [authorize, logAction], changeCard);
