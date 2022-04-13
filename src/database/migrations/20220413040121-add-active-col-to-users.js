module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'active',
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn('users', 'active'),
};
