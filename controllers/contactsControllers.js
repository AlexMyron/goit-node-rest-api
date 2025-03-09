import contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/contactsDecorators.js';

const listContacts = async (_, res) => {
  const contacts = await contactsServices.listContacts();
  if (!contacts.length) {
    throw HttpError(404, 'No contacts found');
  }
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const theContact = await contactsServices.getContactById(req.params.id);
  if (!theContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(theContact);
};

const removeContact = async (req, res, next) => {
  const theContact = await contactsServices.removeContact(req.params.id);
  if (!theContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'Contact deleted', contact: theContact });
};

const addContact = async (req, res, next) => {
  const newContact = await contactsServices.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const updatedContact = await contactsServices.updateContact({
    ...req.body,
    id: req.params.id,
  });

  if (!updatedContact) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }
  res.status(200).json(updatedContact);
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
