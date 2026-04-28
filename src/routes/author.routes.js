import express from 'express';
import * as controller from '../controllers/author.controller.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: J.K. Rowling
 *             bio: British author
 *     responses:
 *       200:
 *         description: Author created
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: J.K. Rowling
 *               bio: British author
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not an admin
 */
router.post('/', authenticate, authorize('ADMIN'), controller.create);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of authors
 *       401:
 *         description: User not logged in
 */
router.get('/', authenticate, controller.getAll);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Retrieve an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author found
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       404:
 *         description: Author does not exist
 */
router.get('/:id', authenticate, controller.getOne);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Invalid fields
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not an admin
 *       404:
 *         description: Author does not exist
 */
router.put('/:id', authenticate, authorize('ADMIN'), controller.update);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Author deleted
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not an admin
 *       404:
 *         description: Author does not exist
 */
router.delete('/:id', authenticate, authorize('ADMIN'), controller.remove);

export default router;