export default function initBookingModel(sequelize, DataTypes) {
  return sequelize.define('booking', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    rentStatus: {
      type: DataTypes.ENUM(['booked', 'cancelled', 'completed']),
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
      },
    },
    carId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    underscored: true,
  });
}
