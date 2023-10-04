import chai from 'chai';
import supertest from 'supertest';
import { createHash } from "../src/utils/Hash.js";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');



describe('Testing AdoptMe', () => {


  describe('Test de productos', () => {
    const newProduct = {
      title: 'Producto de prueba',
      description: 'Descripción de prueba',
      price: 10.99,
      category: 'comida',
      stock: 10,
      code: '123',
      thumbnail: 'URL-de-la-miniatura',
    };

    it('El endpoint POST /productos debe crear satisfactoriamente un producto', async () => {

      const response = await requester.post('/productos').send(newProduct);
  
      expect(response.status).to.equal(201);
      expect(response.body.payload).to.have.property('_id');
    });




    it('El endpoint POST /productos debe devolver un error si faltan datos en la solicitud de creacion de productos', async () => {
      const incompleteProduct = {
        title: 'Producto incompleto',
        description: 'Descripción de prueba',
        
      };

    const response = await requester.post('/productos').send(incompleteProduct);

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Datos de producto incorrectos');
    });



    it('El endpoint GET /productos debe mostrar todos los productos en formato de arreglo', async () => {

      const response = await requester.get('/productos');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
    });
    
    
  });
  



  
  describe('Test de usuarios', () => {
   
    it('El endpoint POST /sessions debe registrar correctamente a un usuario', async () => {
      const newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'prueba@example.com',
        password: 'password123', 
        role: 'user', 
      };
    
      const response = await requester.post('/sessions/register').send(newUser);
    
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('_id');
    });


    it("En el endpoint POST /sessions/register El servicio debe realizar un hasheo efectivo de la contraseña", async () => {
      const passwordLogin = "1234";
      const efectiveHash = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
      const passwordHash = createHash(passwordLogin);
      expect(efectiveHash.test(passwordHash)).to.be.equal(true);
    });



    it('En el endpoint POST /sessions/regiter debería devolver un error si el usuario ya existe', async () => {

      const existingUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'aaabjohndoe@example.com',
        password: 'password123', 
        role: 'user', 
      };
      
      const response = await requester
      .post('/sessions/register') 
      .send(existingUser);
  
      expect(response.status).to.equal(400); 
      expect(response.body).to.have.property('message', 'El usuario ya existe');
    });
  });



  describe('Test de carrito', () => {

    it('El endpoint POST /Cart debe crear satisfactoriamente un carrito', async () => {
      const newCart = {
        products: [],      
      };

      const response = await requester.post('/Cart').send(newCart);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('_id');
    });



    it('El endpoint GET /Cart/:cid debe obtener un carrito por su ID', async () => {
      
      const cartId = '651caf7592fc8ddf38976fa6';
      const response = await requester.get(`/Cart/${cartId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('_id', cartId);
    });



    it('El endpoint GET /Cart/:cid debe devolver un error si el carrito no existe', async () => {
      
      const nonExistentCartId = '651caf7592fc8ddf38976fa8';
      const response = await requester.get(`/Cart/${nonExistentCartId}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('message', 'Carrito no encontrado');
    });
  });





});
