const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'p3_music_db',
  usernanme: 'sequelize',
  password: 'password',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

//need to make models

module.exports = {
  sequelize,
}
