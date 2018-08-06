module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    slug: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {});

  Business.associate = (models) => {
    Business.hasMany(models.User, {
      as: 'employees',
      foreignKey: 'businessSlug',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Business.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'businessSlug',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Business.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'businessSlug',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Business.hasMany(models.Stock, {
      as: 'stocks',
      foreignKey: 'businessSlug',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Business;
};
