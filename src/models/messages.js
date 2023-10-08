import mongoose from "mongoose";

const messagesCollection = "Messages"

const messagesSchema = new mongoose.Schema({
   user: { type: String, required: true },
   message: { type: String, required: true }
});

module.exports = mongoose.model(messagesCollection, messagesSchema)