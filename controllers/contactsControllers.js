import * as contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: contacts,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }

  return res.json({
    status: 'success',
    code: 200,
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.removeContact(id);

  if (deletedContact)
    return res.json({
      status: 'success',
      code: 200,
      data: deletedContact,
    });

  return res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
};

export const createContact = async (req, res) => {
  const data = req.body;
  const newContact = await contactsService.addContact(data);

  return res.json({
    status: 'success',
    code: 201,
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedContact = await contactsService.patchContact(id, data);

  if (!updatedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }

  return res.json({
    status: 'success',
    code: 200,
    data: updatedContact,
  });
};
