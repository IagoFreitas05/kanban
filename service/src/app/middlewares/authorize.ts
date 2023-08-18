import {NextFunction, Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.headers.authorization!.split(" ")[1];
    req.body.user = jsonwebtoken.verify(token, "KANBAN");
    next();
  }catch (e){
    return res.status(401).json({
      error:"Invalid token"
    })
  }
}
