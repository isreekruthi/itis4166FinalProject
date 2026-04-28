import prisma from '../utils/prisma.js';

// CREATE AUTHOR
export const create = async (req, res) => {
  try {
    const author = await prisma.author.create({
      data: req.body,
    });
    res.json(author);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL AUTHORS
export const getAll = async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
};

// GET ONE AUTHOR
export const getOne = async (req, res) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(author);
  } catch (err) {
    res.status(404).json({ message: "Author not found" });
  }
};

// UPDATE AUTHOR
export const update = async (req, res) => {
  try {
    const author = await prisma.author.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(author);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE AUTHOR
export const remove = async (req, res) => {
  try {
    const author = await prisma.author.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(author);
  } catch (err) {
    res.status(404).json({ message: "Author not found" });
  }
};