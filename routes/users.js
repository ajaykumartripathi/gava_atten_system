var express = require('express');
var router = express.Router();
var userCtr = require('../controller/user.controller');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * @swagger
 * tags:
 *  name: users
 *  description: users apis
 */

/**
 * @swagger
 * /users/v1/signUp:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             firstName:
 *                                type: string
 *                             lastName:
 *                                type: string
 *                             email:
 *                                type: string
 *                             mobile_no:
 *                                type: string
 *                             password:
 *                                type: string
 *                             roleId:
 *                                type: integer
 *                             isActive:
 *                                type: boolean
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             firstName:
 *                               type: string
 *                             lastName:
 *                               type: string
 *                             email:
 *                               type: string,
 *                             mobile_no:
 *                               type: string
 *                             password:
 *                               type: string
 *                             roleId:
 *                               type: integer
 *                             isActive:
 *                               type: boolean
 */

router.post('/signUp',userCtr.signUp)

/**
 * @swagger
 * /users/v1/login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             email:
 *                                type: string
 *                             password:
 *                                type: string
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             email:
 *                               type: string
 *                             password:
 *                               type: string
 */

router.post('/login',userCtr.login)

/**
 * @swagger
 * /users/v1/refreshToken:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             refreshtoken:
 *                                type: string
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             refreshtoken:
 *                               type: string
 */

 router.post("/refreshtoken", userCtr.refreshToken);

 /**
 * @swagger
 * /users/v1/allUsers:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: object
 */

 router.get("/allUsers", userCtr.getAllUser);

/**
 * @swagger
 * /users/v1/singleUser/{id}:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: int
 *          required: false
 *          description: userid
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: integer
 *                          properties:
 *                              name:
 *                                  type: integer
 */
 router.get("/singleUser/:id", userCtr.getSingleUser);

 /**
 * @swagger
 * /users/v1/singleUserDelete/{id}:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [users]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: false
 *          description: userid
 *     security:
 *        - jwt: []
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                      schema:
 *                          type: integer
 *                          properties:
 *                              name:
 *                                  type: integer
 */
 router.delete("/singleUserDelete/:id", userCtr.singleDelete);



module.exports = router;
