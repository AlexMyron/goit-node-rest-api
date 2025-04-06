import User from '../db/models/User.js';

const listContacts = async () => {
  try {
    return await User.findAll();
  } catch (err) {
    throw new Error('Error fetching contacts: ' + err.message);
  }
};

const getContactById = async id => {
  try {
    const theContact = await User.findByPk(id);
    if (!theContact) return null;
    return theContact;
  } catch (err) {
    throw new Error('Error fetching contact by ID: ' + err.message);
  }
};

const removeContact = async id => {
  try {
    const affectedRows = await User.destroy({ where: { id } });
    if (affectedRows === 0) {
      return { message: `Contact with id ${id} not found` };
    }
    return { message: `Contact with id ${id} successfully removed` };
  } catch (err) {
    throw new Error('Error removing contact: ' + err.message);
  }
};

const addContact = async data => {
  try {
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Missing required fields');
    }
    return await User.create(data);
  } catch (err) {
    throw new Error('Error adding contact: ' + err.message);
  }
};

const updateContact = async (id, data) => {
  try {
    const [affectedRows] = await User.update(data, { where: { id } });
    if (affectedRows === 0) {
      return { message: `Contact with id ${id} not found or no changes made` };
    }
    const updatedContact = await User.findByPk(id);
    return updatedContact;
  } catch (err) {
    throw new Error('Error updating contact: ' + err.message);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
