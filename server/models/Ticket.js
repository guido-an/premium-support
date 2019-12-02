const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    active: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: Array,
    service: { type: String, enum: ['Web Development', 'Social Media', "Web Marketing", "Graphic Design"], required: true },
    time: String,
    picture: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
) 

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
