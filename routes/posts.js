import express from 'express';
import { error } from 'node:console';
import { index, show, put, create, destroy } from '../controllers/posts.js';
import validateId from '../middlewares/validateId.js';
import validateTitle from '../middlewares/validateTitle.js';
import validateContent from '../middlewares/validateContent.js';
import validatePrepTime from '../middlewares/validatePrepTime.js';
import validatePublish from '../middlewares/validatePublished.js';
import validateTags from '../middlewares/validateTags.js';

// file di routing con le rotte per la entity posts:
// Operazioni CRUD: Index, Show, Update, Create

const router = express.Router();

// index - GET  http://localhost:3000

router.get('/', index);

// show -  GET  http://localhost:3000/posts/:id

router.get('/posts/:id', [validateId, show]);

// create - POST http://localhost:3000

router.post('/posts/', [validateTitle, validateContent, validatePrepTime, validatePublish, validateTags, create]);

// update - PUT || PATCH http://localhost:3000/posts/:id

router.put('/posts/:id', [validateId, validatePublish, validateTags, validateTitle, validateContent, put])


// delete - DELETE http://localhost:3000/posts/:id

router.delete('/posts/:id', [validateId, destroy]);

export default router;