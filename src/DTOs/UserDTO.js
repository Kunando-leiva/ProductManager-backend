class UserDTO {
    constructor(users) {
      this.id = users.id;
      this.first_name = users.firstName;
      this.last_name = users.lastName;
      this.email = users.email;
      this.role = "user";
    }
  }
  
  export default UserDTO;
  