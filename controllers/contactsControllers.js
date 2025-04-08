import contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/contactsDecorators.js';

const listContacts = async (_, res) => {
  const contacts = await contactsServices.listContacts();
  if (!contacts.length) {
    throw HttpError(404, 'No contacts found');
  }
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const theContact = await contactsServices.getContactById(req.params.id);
  if (!theContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(theContact);
};

const removeContact = async (req, res) => {
  const theContact = await contactsServices.removeContact(req.params.id);
  if (!theContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted', contact: theContact });
};

const addContact = async (req, res) => {
  const newContact = await contactsServices.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const updatedContact = await contactsServices.updateContact(
    req.params.id,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsServices.updateStatusContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json(updatedContact);
}

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
