module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('roles', 'identifier', Sequelize.STRING),

  down: (queryInterface) => queryInterface.removeColumn('roles', 'identifier'),
};
