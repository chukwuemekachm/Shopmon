module.exports = (sequelize, DataTypes) => {
  const StockHistory = sequelize.define('StockHistory', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  StockHistory.associate = (models) => {
    StockHistory.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stockId',
    });
  };
  return StockHistory;
};
