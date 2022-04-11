module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users_roles', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    role_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('users_roles'),
};
