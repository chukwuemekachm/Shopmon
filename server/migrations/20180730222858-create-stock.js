module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Stocks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
        as: 'productId',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('Stocks'),
};
