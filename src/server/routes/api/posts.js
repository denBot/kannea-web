"use strict"
const Post = require("../../models/Post")
const express = require("express")
const {
  isAuthenticatedAndAdmin
} = require("./middleware")

let router = express.Router()

router
  .route("/")
  .get(isAuthenticatedAndAdmin, async (req, res) => {
    console.log(req.session)
    await Post.find()
      .sort("-createdAt")
      .select("-content -updatedAt -__v")
      .populate({
        path: "author",
        select: "title avatar role -_id",
      })
      .lean()
      .exec(function (err, posts) {
        res.json(posts)
      })
  })
  .post((res) => {
    res.send("POST Posts")
  })

router
  .route("/:id")
  .get(async (req, res) => {
    const filter = { _id: req.params.id }
    const update = { $inc: { views: 1 } }
    await Post.findOneAndUpdate(filter, update)
      .select("-__v")
      .populate({
        path: "author",
        select: "title avatar role -_id",
      })
      .lean()
      .exec(function (err, doc) {
        res.json(doc)
      })
  })
  .put(async (res, req) => {
    const filter = { _id: req.params.id }
    const update = {
      title: req.body.title,
      content: req.body.content,
    }
    await Post.findOneAndUpdate(filter, update)
      .lean()
      .exec(function (err, doc) {
        //doc.addedProperty = "foobar"
        res.json(doc)
      })
  })
  .delete(async (res, req) => {
    const filter = { _id: req.params.id }
    await Post.deleteOne(filter)
    res.json("Post successfully deleted")
  })

module.exports = router
