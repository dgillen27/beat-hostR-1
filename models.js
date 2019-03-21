const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    loggin: true,
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize({
    database: `p3_music_db`,
    dialect: `postgresql`,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
};

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
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://beathostr.s3.amazonaws.com/bucketFolder/1553189692470-lg.png',
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
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://beathostr.s3.amazonaws.com/bucketFolder/1553189616539-lg.xml',
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
