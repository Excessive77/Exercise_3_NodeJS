const { db, DataTypes } = require('../utils/database.utils');

const Console = db.define('console', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active',
    },
});

module.exports = { Console };
