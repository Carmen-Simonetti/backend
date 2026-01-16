import fs from "node:fs";
import crypto from "node:crypto";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";
console.log("🔥 USER MANAGER CARGADO 🔥");

class UserManager {
  constructor(filePath) {
    this.path = filePath;
  }

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(users);
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    const users = await this.getUsers();
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  };

  register = async (obj) => {
    try {
      const users = await this.getUsers();
   console.log("👉 users es:", users);
    console.log("👉 typeof users:", typeof users);
      const user = {
        id: uuidv4(),
        ...obj,
      };

      user.secret = crypto.randomBytes(128).toString();
      user.password = crypto
        .createHmac("sha256", user.secret)
        .update(user.password)
        .digest("hex");

      users.push(user);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(users, null, 2)
      );

      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (email, password) => {
    const users = await this.getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Invalid credentials");

    const newCrypto = crypto
      .createHmac("sha256", user.secret)
      .update(password)
      .digest("hex");

    if (user.password !== newCrypto) throw new Error("Invalid credentials");

    return "Login OK";
  };
}

export const userManager = new UserManager(
  path.resolve("data/user.json")
);
