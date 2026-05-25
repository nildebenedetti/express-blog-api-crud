import express from 'express';
import { error } from 'node:console';
import { index, show, put, patch, create, deleteFn } from '../controllers/posts.js';

// file di routing con le rotte per la entity posts:
// Operazioni CRUD: Index, Show, Update, Create

const router = express.Router();

// index - GET  http://localhost:3000

router.get('/posts', index);

// show -  GET  http://localhost:3000/:id

router.get('/posts/:id', show);

// create - POST http://localhost:3000

router.post('posts/', create)

// update - PUT || PATCH http://localhost:3000/:id

router.put('/posts/:id', put)

router.patch('/posts/:id', patch)

// delete - DELETE http://localhost:3000/:id

router.delete('/posts/:id', deleteFn);

export default router;