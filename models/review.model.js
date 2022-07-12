const { db, DataTypes } = require('../utils/database.utils');

const Review = db.define('review', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active',
    },
});

module.exports = { Review };
