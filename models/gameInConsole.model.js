const { db, DataTypes } = require('../utils/database.utils');

const gameInConsole = db.define('gameInConsole', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active',
    },
});

module.exports = { gameInConsole };
