const fs = require('fs');
const path = require('path');
const models = {};

// Đường dẫn thư mục models
const modelsDir = __dirname;

// Đọc tất cả file trong thư mục models
fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.model.js'))
  .forEach(file => {
    const model = require(path.join(modelsDir, file));

    // Lấy tên file (ví dụ user.model.js -> User)
    const modelName = path.basename(file, '.model.js')
      .replace(/\.?([a-z])([A-Z])/g, (_, a, b) => a + '_' + b)
      .replace(/(^|\_)(\w)/g, (_, __, c) => c.toUpperCase())
      .replace('Model', ''); 

    models[modelName] = model;
  });

module.exports = models;
