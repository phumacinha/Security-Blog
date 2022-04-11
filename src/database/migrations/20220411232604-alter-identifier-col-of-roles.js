module.exports = {
  up: (queryInterface) => queryInterface.changeColumn('roles', 'identifier', { allowNull: false }),

  down: (queryInterface) => queryInterface.changeColumn('roles', 'identifier', { allowNull: true }),
};
