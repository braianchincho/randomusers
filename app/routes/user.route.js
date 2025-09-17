import express from 'express';
import UserController from '../controllers/users.controllers.js';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of random users
 *     description: Returns a paginated list of randomly generated users. You can optionally filter by gender and age range.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Number of users to return per page (max 100, optional)
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female]
 *         description: Filter users by gender (optional)
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *         description: Minimum age of users (optional)
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *         description: Maximum age of users (optional)
 *     responses:
 *       200:
 *         description: A paginated list of random users
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
 *                       email:
 *                         type: string
 *                       age:
 *                         type: integer
 *                       gender:
 *                         type: string
 *                         enum: [male, female]
 */

router.get('/users', userController.getUsers.bind(userController));

export default router;