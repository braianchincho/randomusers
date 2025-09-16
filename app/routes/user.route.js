import express from 'express';
import UserController from '../controllers/users.controllers.js';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a paginated list of users
 *     description: Returns a list of randomly generated users with pagination support.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number (starts at 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Number of users per page.
 *     responses:
 *       200:
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 50
 *                 totalUsers:
 *                   type: integer
 *                   example: 500
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       userName:
 *                         type: string
 *                         example: jdoe
 */

router.get('/users', userController.getUsers.bind(userController));

export default router;