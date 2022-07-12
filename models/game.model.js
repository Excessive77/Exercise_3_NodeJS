const { db, DataTypes } = require('../utils/database.utils');

const Game = db.define('game', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active',
    },
});

module.exports = { Game };
