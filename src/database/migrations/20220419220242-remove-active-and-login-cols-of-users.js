module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.removeColumn('users', 'login'),
    queryInterface.removeColumn('users', 'active'),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'users',
      'login',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'users',
      'active',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    ),
  ]),
};
