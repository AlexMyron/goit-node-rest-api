import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';

import {
  addContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.listContacts);

contactsRouter.get('/:id', contactsControllers.getContactById);

contactsRouter.delete('/:id', contactsControllers.removeContact);

contactsRouter.post('/', validateBody(addContactSchema), contactsControllers.addContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), contactsControllers.updateContact);

contactsRouter.patch('/:contactId/favorite', contactsControllers.updateStatusContact);

export default contactsRouter;
