const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cake', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});

const conn = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

conn()