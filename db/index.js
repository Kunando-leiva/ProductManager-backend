import { connect } from "mongoose";
import { mongourl } from "../src/config/db.config.js";

const mongoConnect = async () => {
  try {
    await connect(
        "mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority"
        
    );
   
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnect;