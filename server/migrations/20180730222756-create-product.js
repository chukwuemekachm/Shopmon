module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    modelNo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Products'),
};
