import mongoose from "mongoose";

const messagesCollection = "Messages"

const messagesSchema = new mongoose.Schema({
   user: String,
   message: String,
});

module.exports = mongoose.model(messagesCollection, messagesSchema)