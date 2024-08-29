'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id',targetKey: 'id', as: 'category' });
      Product.hasMany(models.ProductImage, { foreignKey: 'productId' });
      Product.belongsToMany(models.Flavor, {
        through: 'ProductFlavors',
        foreignKey: 'productId'
      });
      Product.hasMany(models.OrderItem, { foreignKey: 'productId',as: 'data' } );
    }
    
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    totalSales: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};