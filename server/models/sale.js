module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', {}, {});

  Sale.associate = (models) => {
    Sale.belongsTo(models.Business, {
      as: 'business',
      foreignKey: 'businessSlug',
    });
    Sale.belongsTo(models.User, {
      as: 'employee',
      foreignKey: 'userUsername',
    });
    Sale.hasMany(models.SaleDetail, {
      as: 'details',
      foreignKey: 'saleId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Sale;
};
