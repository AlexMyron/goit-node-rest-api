import { nanoid } from 'nanoid';

import fs from 'node:fs/promises';
import path from 'path';

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const contactsPath = path.resolve('db', 'contacts.json'); // Might be not so efficient as the commented snippet above.

const updateContacts = async contactsList => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  } catch (err) {
    console.error('Error writing contacts file:', err.message);
    throw new Error('Failed to update contacts');
  }
};

const getAllContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (err) {
    console.error('Error getting all contacts list:', err.message);
    throw new Error('Failed to get contacts');
  }
};

const getOneContact = async contactId => {
  const contacts = await getAllContacts();
  return contacts.find(({ id }) => id === contactId) || null;
};

const deleteContact = async contactId => {
  const contacts = await getAllContacts();
  const theContactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (theContactIdx === -1)
    throw new Error(`Contact with id ${contactId} not found...`);

  const theContact = contacts[theContactIdx];
  contacts.splice(theContactIdx, 1);
  await updateContacts(contacts);
  return theContact;
};

const createContact = async data => {
  const newContact = {
    id: nanoid(),
    ...data,
  };

  const contactsList = await getAllContacts();
  contactsList.push(newContact);
  await updateContacts(contactsList);

  return newContact;
};

const updateContact = async data => {
  if (!data || !data.id)
    throw new Error('Invalid data: ID is required for updating a contact');

  const contacts = await getAllContacts();
  const theContactIdx = contacts.findIndex(({ id }) => id === data.id);

  if (theContactIdx === -1)
    throw new Error(`Contact with ID ${data.id} not found`);

  contacts[theContactIdx] = { ...contacts[theContactIdx], ...data };

  await updateContacts(contacts);
  return contacts[theContactIdx];
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
