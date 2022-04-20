module.exports = {
  up: (queryInterface) => queryInterface.addConstraint('users', ['email'], {
    type: 'unique',
    name: 'email_login',
  }),

  down: (queryInterface) => queryInterface.removeConstraint('users', 'email_login'),
};
