const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/tight-spot")

mongoose.Promise = Promise

module.exports = mongoose
