import { Router } from "express";
import jwt from "jsonwebtoken";

export default class customRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    //Simplemente va a ser para poder acceder al router de express desde fuera
    return this.router;
  }

  init() {} //Éste no nos interesa ahorita, pero le interesará a nuestros hijos

  get(path, policies, ...callbacks) {
    //Aquí mandamos a llamar el get que ya conoces de express
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    next();
  };

  handlePolicies = (policies) => {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();
  
      const authHeaders = req.headers.authorization;
      if (!authHeaders) {
        console.log("Unauthorized: No authorization headers");
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      }
  
      const token = authHeaders.split(" ")[1];
      try {
        const user = jwt.verify(token, "<SECRET>");
        console.log("User role:", user.role);
  
        if (!policies.includes(user.role.toUpperCase())) {
          console.log("Forbidden: User role does not have access");
          return res.status(403).send({ status: "error", error: "Forbidden" });
        }
  
        req.user = user;
        console.log("Authorized user:", user);
        next();
      } catch (error) {
        console.log("JWT verification error:", error.message);
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      }
    };
  };
  

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
}