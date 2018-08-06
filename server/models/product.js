module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modelNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Product.associate = (models) => {
    Product.belongsTo(models.Business, {
      as: 'business',
      foreignKey: 'businessSlug',
    });
    Product.hasOne(models.Stock, {
      as: 'stock',
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Product.hasMany(models.SaleDetail, {
      as: 'sales',
      foreignKey: 'productId',
      onUpdate: 'CASCADE',
    });
  };
  return Product;
};
