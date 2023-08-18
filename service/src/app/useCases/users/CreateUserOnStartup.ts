import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function createUserOnStartup() {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash("123456", salt);
    await User.create({ login: "kanban", senha: encryptedPassword });

    console.log("Created user on startup");
  } catch (error) {
    console.error("Could not create a new user:", error);
  }
}
