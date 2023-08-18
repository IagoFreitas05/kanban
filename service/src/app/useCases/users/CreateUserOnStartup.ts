import {User} from "../../models/User";
import { Request, Response } from "express";

export async function createUserOnStartup(){
  try{
    const category = await User.create({login:"kanban", senha:"12345"});
  }catch{
    console.log("could not create a new user")
  }
}
