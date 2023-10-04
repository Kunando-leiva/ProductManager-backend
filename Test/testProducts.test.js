import mongoose from "mongoose";
import Assert from "assert";
import user from "../src/dao/db/users.dao.js";
import userModel from "../src/dao/db/models/userModel.js";

const MONGO_URL = "mongodb+srv://bidabehere:bidabehere@cluster0.a5dcy.mongodb.net/Coder51185";
const assert = Assert.strict;

describe("Testing para la clase Users dao", () => {
  before(async function () {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.usersDao = new user();
  });

  beforeEach(async function () {
    await userModel.deleteMany();
    this.timeout(10000);
  });

  it("El método get de la clase Users debe obtener los usuarios en formato de arreglo", async function () {
    const result = await this.usersDao.getAllUsers();
    assert.strictEqual(result.length, 0); // Verifica que la longitud del resultado sea 0
  });

  it("El endpoint DELETE /sessions/:id debe devolver un estado 404 si el usuario no se encuentra", async () => {
    // Supongamos que tienes un ID de usuario que no existe, por ejemplo:
    const id = "nonexistentuserid";

    try {
      const response = await this.usersDao.deleteUser(id);
      assert.fail("Se esperaba un error 404"); // Indica que se esperaba un error 404
    } catch (error) {
      assert.strictEqual(error.status, 404); // Verifica que el error tenga un estado 404
      // Verifica que el cuerpo del error contenga un mensaje indicando que el usuario no se encontró si es necesario
      assert.strictEqual(error.message, "User not found");
    }
  });
});
