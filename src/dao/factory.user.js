import mongoConnect from "../../db/index.js";
import { persistence } from "../config/app.config.js";

let Userdao

switch (persistence) {
  
  case "memory":
    const { default: UserManager } = await import("./memory/UserManager.js");
    Userdao= new UserManager();
    break;
  case "mongo":
    mongoConnect();
    const { default: UserDao } = await import("./db/users.dao.js");
    Userdao = new UserDao();
    break;
}

export default Userdao;