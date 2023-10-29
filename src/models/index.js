require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const db = {};

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
  logging: true,
  logQueryParameters: true,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// iterate and get all model files relative path
const files = [];
const getFilesRecursively = (dir) => {
  const filesInDir = fs.readdirSync(dir);
  filesInDir.forEach((file) => {
    const filePath = path.join(dir, file);

    // Check if the current item is a directory
    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively call the function on it
      getFilesRecursively(filePath);
    } else if (
      filePath !== path.join(dir, basename) // It's not the current file
    ) {
      files.push(filePath);
    }
  });
};
getFilesRecursively(__dirname);

files.forEach((file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
