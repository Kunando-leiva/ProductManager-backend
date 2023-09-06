
import mongoose from 'mongoose';

const CollectionTicket = 'Ticket'


const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

});

const Ticket = mongoose.model(CollectionTicket, ticketSchema);

export default Ticket;
