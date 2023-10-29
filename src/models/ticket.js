const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      //   Ticket.belongsTo(models.User, {
      //     foreignKey: 'assignee',
      //     as: 'assignedAgent',
      //   });
    }
  }
  Ticket.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'category_id',
      },
      priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Closed'),
        allowNull: false,
        defaultValue: 'Open',
      },
      assignee: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'tickets',
      schema: 'ticket_desk',
    }
  );

  return Ticket;
};
