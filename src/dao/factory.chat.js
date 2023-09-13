import mongoConnect from "../../db/index.js";
import { persistence } from "../config/app.config.js";

let Chatdao

switch (persistence) {
  
  case "memory":
    const { default: chatManager } = await import("./memory/chatManager.js");
    Chatdao = new chatManager();
    break;
  case "mongo":
    mongoConnect();
    const { default: chatDao } = await import("./db/mensajes.dao.js");
    Chatdao = new chatDao();
    break;
}

export default Chatdao;