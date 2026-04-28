import express from 'express';
import * as controller from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: Password123!
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 *               role: member
 *       400:
 *         description: Missing fields or invalid email
 *       409:
 *         description: Email already exists
 */
router.post('/signup', controller.signup);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john@example.com
 *             password: Password123!
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             example:
 *               token: jwt_token_here
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', controller.login);

export default router;