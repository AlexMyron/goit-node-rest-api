import express from 'express';
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from '../controllers/contactsControllers.js';

import {
  addContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', listContacts);

contactsRouter.get('/:id', getContactById);

contactsRouter.delete('/:id', removeContact);

contactsRouter.post('/', validateBody(addContactSchema), addContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);

export default contactsRouter;
