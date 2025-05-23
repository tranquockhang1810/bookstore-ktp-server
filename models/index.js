const fs = require('fs');
const path = require('path');
const sequelize = require('../db/postgres'); // Đảm bảo đúng đường dẫn
const models = {};

// Tự động import tất cả các model
fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.model.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model; // Sequelize model có .name
  });

// Gắn sequelize và Sequelize vào models nếu cần
models.sequelize = sequelize;
models.Sequelize = require('sequelize');

// Thiết lập associations
const initAssociations = require('./associations');
initAssociations(models); // Truyền models vào associations.js

module.exports = models;
