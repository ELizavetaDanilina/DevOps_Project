const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router

   // Post 
   .post('/', (req, resp) => {
    userController.createUser(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })

    // Get all users
    .get('/', (req, resp) => { 
      userController.getAllUsers((err, res) => {
        let respObj
        if(err) {
          respObj = {
            status: "error",
            msg: err.message
          }
          return resp.status(400).json(respObj)
        }
        respObj = {
          status: "success",
          msg: res
        }
        resp.status(200).json(respObj)
      })
    })

    // Get one user
    .get('/:username', (req, resp) => { 
      const username = req.params.username
      userController.getUserByUsername(username, (err, res) => {
        let respObj
        if(err) {
          respObj = {
            status: "error",
            msg: err.message
          }
          return resp.status(400).json(respObj)
        }
        respObj = {
          status: "success",
          msg: res
        }
        resp.status(200).json(respObj)
      })
    })

    // Put
    .put('/:username', (req, resp) => { 
      const username = req.params.username
      const updatedUser = req.params.updatedUser
      userController.updateUser(username, updatedUser, (err, res) => {
        let respObj
        if(err) {
          respObj = {
            status: "error",
            msg: err.message
          }
          return resp.status(400).json(respObj)
        }
        respObj = {
          status: "success",
          msg: res
        }
        resp.status(200).json(respObj)
      })
    })

    // Delete
    .delete('/:username', (req, resp) => { 
      const username = req.params.username
      userController.deleteUser(username, (err, res) => {
        let respObj
        if(err) {
          respObj = {
            status: "error",
            msg: err.message
          }
          return resp.status(400).json(respObj)
        }
        respObj = {
          status: "success",
          msg: res
        }
        resp.status(200).json(respObj)
      })
    })
    
module.exports = router;
