import prisma from '../utils/prisma.js';

// CREATE BOOK
export const create = async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
    });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL BOOKS
export const getAll = async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

// GET ONE BOOK
export const getOne = async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(book);
};

// UPDATE BOOK
export const update = async (req, res) => {
  try {
    const book = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE BOOK
export const remove = async (req, res) => {
  try {
    const book = await prisma.book.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(book);
  } catch (err) {
    res.status(404).json({ message: "Book not found" });
  }
};