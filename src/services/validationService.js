/* eslint-disable no-useless-escape */
module.exports = {
  isEmail: (value, boolReturn = false) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const isValidEmail = String(value).match(emailRegex);

    if (!isValidEmail) {
      if (boolReturn) return false;
      throw new Error('invalid e-mail');
    }

    return true;
  },

  isValidName: (value) => {
    const nameRegex = /^[a-z]+[a-z ,\.'-]+?$/i;
    const isValidName = String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .match(nameRegex);

    if (!isValidName) {
      throw new Error('invalid name');
    }

    return true;
  },

  isStrongPassword: (value) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!\.@#$&_\-\*]).{8,}$/;
    const isStrong = String(value).match(strongPasswordRegex);

    if (!isStrong) {
      throw new Error('password must be between 8 and 64 characters long and have at least one uppercase letter, one lowercase letter, one number, one of the special characters (!.@#$&*).');
    }

    return true;
  },
};
