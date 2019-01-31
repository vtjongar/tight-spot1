const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Answer = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Dilemma = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  answers: [Answer]
});

module.exports = {
  Dilemma: mongoose.model("Dilemma", Dilemma),
  Answer: mongoose.model("Answer", Answer)
};
