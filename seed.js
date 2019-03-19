const { User, Album, Song } = require('./models');

//////////////////////////////////////
const main = async () => {

  const users = [];

  for(let i = 1; i <= 10; i++) {
    users[i] = await User.create({
      email: `user${i}@email.com`,
      password_digest: `user${i}`,
      artist_name: `user${i}`
    });
  };

  const albums = [];

  for(let i = 0; i < users.length; i++) {
    for(let j = 1; j <= 3; j++) {
      albums[i + j]
    }
  }

  //////////////////////////////////////////

  //////////////////////////////////////////

}

main();
