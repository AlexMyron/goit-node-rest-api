import { DataTypes } from 'sequelize';

import sequelize from '../sequelize.js';

const User = sequelize.define('contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[0-9+\-().\s]+$/i,
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// User.sync({force: true});

export default User;
