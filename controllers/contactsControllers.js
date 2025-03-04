import contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/contactsDecorators.js';

export const getAllContacts = async (_, res) => {
  const contacts = await contactsServices.getAllContacts();
  if (!contacts.length) {
    throw HttpError(404, 'No contacts found');
  }
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const theContact = await contactsServices.getOneContact(req.params.id);
  if (!theContact) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }
  res.status(200).json(theContact);
};

export const deleteContact = async (req, res, next) => {
  const theContact = await contactsServices.deleteContact(req.params.id);
  if (!theContact) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }
  res.status(200).json({ message: 'Contact deleted', contact: theContact });
};

export const createContact = async (req, res, next) => {
  const newContact = await contactsServices.createContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
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
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
