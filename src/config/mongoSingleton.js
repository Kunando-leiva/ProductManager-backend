import mongoose from "mongoose";
import { mongourl } from "./db.config.js";

class MongoSingleton {
  static #instance;

  constructor() {
    this.connection = mongoose.createConnection();
    `mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority`
    this.connection.on("connected", () => {
      console.log("Conectado a la base de datos");
    });
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya tienes una instancia creada");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}

export default MongoSingleton;
