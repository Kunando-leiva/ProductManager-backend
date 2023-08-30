class PrivateController {
    constructor() {}
  
    getPrivateData(req, res) {
      res.json({ message: "Si estás viendo esto es porque sos admin" });
    }
  }
  
  export default PrivateController;