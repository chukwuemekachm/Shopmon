
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    businessSlug: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Businesses',
        key: 'slug',
        as: 'businessSlug',
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
      default: 'user',
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
