import express from 'express';
import authRoutes from './routes/auth.routes.js';
import authorRoutes from './routes/author.routes.js';
import bookRoutes from './routes/book.routes.js';
import borrowingRoutes from './routes/borrowing.routes.js';
import { swaggerDocs } from './docs/swagger.js';

const app = express();
swaggerDocs(app);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowings', borrowingRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});