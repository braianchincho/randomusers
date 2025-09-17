import express from 'express';
import UserController from '../controllers/users.controllers.js';
import validateUserQuery from '../middlewares/validate-user.query.js';
const router = express.Router();
const userController = new UserController();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a paginated list of random users
 *     description: |
 *       Returns a list of randomly generated users.  
 *       Supports optional filtering by gender and age range.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number (must be a positive integer)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         required: false
 *         description: Number of users per page (1-100)
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female]
 *         required: false
 *         description: Filter users by gender
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: false
 *         description: Minimum age of users
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: false
 *         description: Maximum age of users (must be >= minAge if both are provided)
 *     responses:
 *       200:
 *         description: List of users with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalUsers:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       userName:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                         format: uri
 *                       email:
 *                         type: string
 *                         format: email
 *                       age:
 *                         type: integer
 *                       gender:
 *                         type: string
 *                         enum: [male, female]
 *       400:
 *         description: Invalid query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "limit must be between 1 and 100"
 */

router.get('/users', validateUserQuery,userController.getUsers.bind(userController));

export default router;