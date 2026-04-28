import prisma from '../utils/prisma.js';

// BORROW BOOK
export const borrowBook = async (req, res) => {
  try {
    const borrowing = await prisma.borrowing.create({
      data: {
        userId: req.user.id,
        bookId: req.body.bookId,
        status: "BORROWED",
      },
    });

    res.json(borrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET USER BORROWINGS
export const getMyBorrowings = async (req, res) => {
  const borrowings = await prisma.borrowing.findMany({
    where: { userId: req.user.id },
  });

  res.json(borrowings);
};

// GET ONE BORROWING
export const getOne = async (req, res) => {
  const borrowing = await prisma.borrowing.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!borrowing) {
    return res.status(404).json({ message: "Not found" });
  }

  // ownership check
  if (req.user.role !== "ADMIN" && borrowing.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(borrowing);
};

// RETURN BOOK (ADMIN ONLY)
export const returnBook = async (req, res) => {
  try {
    const updated = await prisma.borrowing.update({
      where: { id: Number(req.params.id) },
      data: {
        status: "RETURNED",
        returnDate: new Date(),
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE BORROWING (ADMIN ONLY)
export const remove = async (req, res) => {
  try {
    const deleted = await prisma.borrowing.delete({
      where: { id: Number(req.params.id) },
    });

    res.json(deleted);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};