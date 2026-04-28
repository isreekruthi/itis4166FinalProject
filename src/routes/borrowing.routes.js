import express from 'express';
import * as controller from '../controllers/borrowing.controller.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

/**
 * @swagger
 * /api/borrowings:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             bookId: 1
 *     responses:
 *       200:
 *         description: Borrowing created
 *       400:
 *         description: Invalid bookId
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not a member
 *       404:
 *         description: Book does not exist
 *       409:
 *         description: Book already borrowed
 */
router.post('/', authenticate, controller.borrowBook);

/**
 * @swagger
 * /api/borrowings:
 *   get:
 *     summary: Get user's borrowings
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of borrowings
 *       401:
 *         description: User not logged in
 */
router.get('/', authenticate, controller.getMyBorrowings);

/**
 * @swagger
 * /api/borrowings/{id}:
 *   get:
 *     summary: Get borrowing by ID
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Borrowing found
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       403:
 *         description: Not owner or admin
 *       404:
 *         description: Borrowing does not exist
 */
router.get('/:id', authenticate, controller.getOne);

/**
 * @swagger
 * /api/borrowings/{id}/return:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book returned
 *       400:
 *         description: Invalid fields
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not admin
 *       404:
 *         description: Borrowing does not exist
 */
router.put('/:id/return', authenticate, authorize('ADMIN'), controller.returnBook);

/**
 * @swagger
 * /api/borrowings/{id}:
 *   delete:
 *     summary: Delete a borrowing record
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Borrowing deleted
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not logged in
 *       403:
 *         description: User is not admin
 *       404:
 *         description: Borrowing does not exist
 */
router.delete('/:id', authenticate, authorize('ADMIN'), controller.remove);
export default router;