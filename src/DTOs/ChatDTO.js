class MensajeDTO {
    constructor(messages) {
      this.id = messages.id;
      this.user = messages.user;
      this.message = messages.message;
    }
  }
  
  export default MensajeDTO;