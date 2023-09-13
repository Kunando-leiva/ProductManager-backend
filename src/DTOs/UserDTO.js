class UserDTO {
    constructor(users) {
      this.id = users.id;
      this.firstName = users.firstName;
      this.lastName = users.lastName;
      this.email = users.email;
      this.role = "user";
    }
  }
  
  export default UserDTO;
  