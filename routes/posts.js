import express from 'express';
import { error } from 'node:console';
import { index, show, put, create, destroy } from '../controllers/posts.js';
import verificaId from '../middlewares/verificaId.js';

// file di routing con le rotte per la entity posts:
// Operazioni CRUD: Index, Show, Update, Create

const router = express.Router();

// index - GET  http://localhost:3000

router.get('/', index);

// show -  GET  http://localhost:3000/posts/:id

router.get('/posts/:id', [verificaId, show]);

// create - POST http://localhost:3000

router.post('/posts/', create)

// update - PUT || PATCH http://localhost:3000/posts/:id

router.put('/posts/:id', [verificaId, put])


// delete - DELETE http://localhost:3000/posts/:id

router.delete('/posts/:id', [verificaId, destroy]);

export default router;