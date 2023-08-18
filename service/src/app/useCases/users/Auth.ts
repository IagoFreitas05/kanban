import {IUser} from "../../types/IUser";
import {User} from "../../models/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
export const auth = async (req: Request, res: Response)=> {
  const { login, senha }: IUser = req.body;

  try {
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    bcrypt.compare(senha, user.senha, function (err, isMatch) {
      if (err) {
        return res.status(500).json({
          error: "Internal server error"
        });
      }

      if (!isMatch) {
        return res.status(403).json({
          error: "Incorrect password"
        });
      }

      const token = jsonwebtoken.sign(
        { id: user._id },
        "KANBAN",{expiresIn: 86400}
      );
      return res.status(200).json({
        token: token
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
