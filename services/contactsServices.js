import fs from 'node:fs/promises';
import path from 'path';

import User from '../db/models/User.js';

const contactsPath = path.resolve('db', 'contacts.json'); // Might be not so efficient as the commented snippet above.

const updateContacts = async contactsList => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  } catch (err) {
    console.error('Error writing contacts file:', err.message);
    throw new Error('Failed to update contacts');
  }
};

const listContacts = () => User.findAll();

const getContactById = async contactId => {
  const contacts = await listContacts();
  const theContact = contacts.find(({ id }) => id === contactId) || null;

  return theContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const theContactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (theContactIdx === -1) return null;

  const theContact = contacts[theContactIdx];
  contacts.splice(theContactIdx, 1);
  await updateContacts(contacts);
  return theContact;
};

const addContact = data => User.create(data);

const updateContact = async data => {
  if (!data || !data.id)
    throw new Error('Invalid data: ID is required for updating a contact');

  const contacts = await listContacts();
  const theContactIdx = contacts.findIndex(({ id }) => id === data.id);

  if (theContactIdx === -1)
    throw new Error(`Contact with ID ${data.id} not found`);

  contacts[theContactIdx] = { ...contacts[theContactIdx], ...data };

  await updateContacts(contacts);
  return contacts[theContactIdx];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
