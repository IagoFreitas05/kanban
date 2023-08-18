import { Request, Response } from "express";
import {Card} from "../../models/Card";


export async function listCards(req: Request, res: Response){
  try {
    const categories = await Card.find();
    res.json(categories);
  } catch {
    res.sendStatus(500);
  }
}
