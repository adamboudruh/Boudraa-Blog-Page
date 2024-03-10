const { Model, DataTypes } = require('sequelize'); // Import necessary modules from Sequelize
const sequelize = require('../config/connection'); // Import the connection to the database

// Define the Comments model, extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comments model with its attributes and options
Comment.init(
    {
      // Define the 'id' attribute
      id: {
        type: DataTypes.INTEGER, // Data type is INTEGER
        allowNull: false, // It cannot be null
        primaryKey: true, // It is the primary key
        autoIncrement: true, // It auto-increments
      },
      // Define the 'content' attribute
      body: {
        type: DataTypes.TEXT, // Data type is TEXT
        allowNull: false, // It cannot be null
      },
      // Define the 'game_id' attribute
      post_id: {
        type: DataTypes.INTEGER, // Data type is INTEGER
        allowNull: false, // It cannot be null
        references: { // It references the 'id' attribute of the 'game' model
          model: 'blogpost',
          key: 'id',
        }
      },
      // Define the 'user_id' attribute
      user_id: {
        type: DataTypes.INTEGER, // Data type is INTEGER
        allowNull: false, // It cannot be null
        references: { // It references the 'id' attribute of the 'user' model
          model: 'user',
          key: 'id',
        }
      },
    },
    {
      sequelize, // Pass the connection instance to the model
      timestamps: true, // Enable timestamps for createdAt and updatedAt columns
      freezeTableName: true, // Do not pluralize the table name
      modelName: 'comment', // Set the model name
    }
  );

module.exports = Comment; // Export the Comments model for usage in other files
