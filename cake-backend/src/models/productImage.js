'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  
  return ProductImage;
};
