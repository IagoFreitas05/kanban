import {Request, Response} from "express";

export async function changeCard(req : Request, res: Response){
  res.status(200).json({message:"good job!"})
}
