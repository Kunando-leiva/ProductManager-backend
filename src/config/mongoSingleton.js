import mongoose from "mongoose";
import config from "./config.js";

const MONGODB_URL = config.MONGODB_URL;

 class MongoSingleton {
  static #instance;
  constructor() {
    mongoose.connect(`${MONGODB_URL}`)
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya tenes una instancia creada");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("Instancia crceada - conectado");
    return this.#instance;
  }
}

export default MongoSingleton