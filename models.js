const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'p3_music_db',
  username: 'sequelize',
  password: 'password',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Album = sequelize.define('album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  file_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.hasMany(Album, {
  foreignKey: {
    allowNull: false,
  },
});

Album.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

Album.hasMany(Song, {
  foreignKey: {
    allowNull: false,
  },
});

Song.belongsTo(Album, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  User,
  Album,
  Song,
}
