module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_group', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    group_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'groups', key: 'id' },
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

  down: (queryInterface) => queryInterface.dropTable('user_group'),
};
