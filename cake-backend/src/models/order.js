'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User,  { foreignKey: 'userId',targetKey: 'id', as: 'user' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    totalAmount: DataTypes.FLOAT,
    orderDate: DataTypes.DATE,
    note:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};