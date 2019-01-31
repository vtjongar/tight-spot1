const {Dilemma, Answer} = require("../models/Dilemma")
const User = require("../models/User")

module.exports = {
    show: (req, res) => {
      Dilemma.findOne({ _id: req.params.id })
      .populate("author")
      .exec(function(err, dilemma) {
        Answer.populate(dilemma.answers, { path: "author" }, function(
          err,
          answers
        ) {
          dilemma.answers = answers
          res.render("dilemma/show", dilemma)
        })
      })
  },
    new: (req, res) => {
      User.find({}).then(users => {
        res.render("dilemma/new", { users })
      })
    },
    create: (req, res) => {
      console.log('body', req.body)
      Dilemma.create({
        content: req.body.dilemma.content,
        author: req.body.author
      }).then(dilemma => {
        console.log('dilemma ', dilemma)
        User.findOne({ _id: req.body.author }).then(user => {
          user.dilemmas.push(dilemma)
          user.save(result => {
            console.log(result)
            res.redirect(`/dilemma/${dilemma._id}`)
          })
        })
      })
    },
    update: (req, res) => {
      console.log('body', req.body)
      let { content, author } = req.body;
      Dilemma.findOne({ _id: req.params.id }).then(dilemma => {
        dilemma.answers.push({
          content,
          author
        });
        dilemma.save(err => {
          res.redirect(`/dilemma/${dilemma._id}`);
        });
      });
    },
    delete: (req, res) => {
      Dilemma.findOneAndRemove({ _id: req.params.id }).then(dilemma => {
        res.redirect('/')
      });
    },
  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  }
};