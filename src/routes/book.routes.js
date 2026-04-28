import express from 'express';
import * as controller from '../controllers/book.controller.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Harry Potter
 *             description: Fantasy novel
 *             isbn: 123
 *             publishedDate: 2024-01-01T00:00:00.000Z
 *             authorId: 1
 *     responses:
 *       200:
 *         description: Book created
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
 * /api/books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: User not logged in
 */
router.get('/', authenticate, controller.getAll);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book found
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       404:
 *         description: Book does not exist
 */
router.get('/:id', authenticate, controller.getOne);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid fields
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not an admin
 *       404:
 *         description: Book does not exist
 */
router.put('/:id', authenticate, authorize('ADMIN'), controller.update);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book deleted
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not an admin
 *       404:
 *         description: Book does not exist
 */
router.delete('/:id', authenticate, authorize('ADMIN'), controller.remove);

export default router;