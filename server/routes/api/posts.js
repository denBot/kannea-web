"use strict";

const express = require('express');
let router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send("GET posts");
    })
    .post((res, req) => {
        res.send("POST Posts");
    });

router.route('/:postid')
    .get((req, res) => {
        res.send("View Post: " + req.params.postid);
    })
    .put((res, req) => {
        res.send("Update Post: " + req.params.postid);
    })
    .delete((res, req) => {
        res.send("Delete Post: " + req.params.postid);
    });

module.exports = router;