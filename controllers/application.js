const { Dilemma } = require("../models/Dilemma")
module.exports = {
    index: (req, res) => {
      Dilemma.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
      .then(dilemmas => {
        res.render("app/index", { dilemmas });
      })
    }
  };
