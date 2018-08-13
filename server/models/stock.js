module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Stock.associate = (models) => {
    Stock.belongsTo(models.Business, {
      as: 'business',
      foreignKey: 'businessSlug',
    });
    Stock.hasOne(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
    Stock.hasMany(models.StockHistory, {
      as: 'histories',
      foreignKey: 'stockId',
      onUpdate: 'CASCADE',
    });
  };
  return Stock;
};
