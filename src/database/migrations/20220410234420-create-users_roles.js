module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_roles', {
    // id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
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

  down: (queryInterface) => queryInterface.dropTable('user_roles'),
};
