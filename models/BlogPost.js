const { Model, DataTypes } = require('sequelize'); // Import necessary modules from Sequelize
const sequelize = require('../config/connection'); // Import the connection to the database

// Define the BlogPost model, extending Sequelize's Model class
class BlogPost extends Model {}

// Initialize the BlogPost model with its attributes and options
BlogPost.init(
  {
    // Define the 'id' attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'home_team' attribute
    title: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
    },
    // Define the 'away_team' attribute
    body: {
      type: DataTypes.TEXT, // Data type is STRING
      allowNull: false, // It cannot be null
    },
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
    timestamps: true, // Disable timestamps for createdAt and updatedAt columns
    freezeTableName: true, // Do not pluralize the table name
    underscored: true, // Use snake_case for column names
    modelName: 'blogpost', // Set the model name
  }
);

module.exports = BlogPost; // Export the Game model for usage in other files