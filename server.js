const { app } = require('./app');

//Models
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');
const { Review } = require('./models/review.model');

// const { gameInConsole } = require('./models/gameInConsole.model');

//utils
const { db } = require('./utils/database.utils');
const { User } = require('./models/user.model');

db.authenticate()
    .then(() => console.log('DB authenticated'))
    .catch(err => console.log(err));

//Init model relations
Game.belongsToMany(Console, { through: 'gameInConsole' });
Console.belongsToMany(Game, { through: 'gameInConsole' });

//Relation between User and Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

//Relation between Game and Review
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

db.sync()
    .then(() => console.log('DB sync'))
    .catch(err => console.log(err));

app.listen(4000, () => {
    console.log('Is alive on port 4000');
});
