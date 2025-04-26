const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
    
    // Sync models
    require('../models');
    await sequelize.sync({ alter: true });
    console.log('Synced models to database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
  }
})();

module.exports = sequelize;
