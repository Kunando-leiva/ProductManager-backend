class UserDTO {
  constructor(users) {
    this._id = users._id;
    this.first_name = users.first_name;
    this.last_name = users.last_name;
    this.email = users.email;
    this.password = users.password;
    this.role = users.role;
    this.cart = users.cart;
    this.documents = users.documents;
    this.last_connection = users.last_connection;
  }
}

export default UserDTO;
