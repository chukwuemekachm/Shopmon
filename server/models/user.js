module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Business, {
      as: 'business',
      foreignKey: 'businessSlug',
    });
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'userUsername',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
