module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('StockHistories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    stockId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Stocks',
        key: 'id',
        as: 'stockId',
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
  down: queryInterface => queryInterface.dropTable('StockHistories'),
};
