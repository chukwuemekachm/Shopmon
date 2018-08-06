module.exports = (sequelize, DataTypes) => {
  const SaleDetail = sequelize.define('SaleDetail', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  SaleDetail.associate = (models) => {
    SaleDetail.belongsTo(models.Business, {
      as: 'business',
      foreignKey: 'businessSlug',
    });
    SaleDetail.belongsTo(models.Sale, {
      as: 'sale',
      foreignKey: 'saleId',
    });
    SaleDetail.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
  };
  return SaleDetail;
};
