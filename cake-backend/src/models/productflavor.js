'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductFlavor extends Model {
    static associate(models) {
      // define association here
      ProductFlavor.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      ProductFlavor.belongsTo(models.Flavor, { foreignKey: 'flavorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  ProductFlavor.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    flavorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Flavors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProductFlavor',
  });
  return ProductFlavor;
};
