const { User, Album, Song } = require('./models');

//////////////////////////////////////
const main = async () => {

  for(let i = 1; i <= 10; i++) {
    const i = await User.create({
      email: `user${i}@email.com`,
      password_digest: `user${i}`,
      artist_name: `user${i}`
    })
  }

  //////////////////////////////////////////

  const album1 = await user1.createAlbum({
    title: 'user1 album1',
    genre: 'genre',
  });

  //////////////////////////////////////////

  const song1 = await album1.createSong({
    title: 'song1',
    file_url: 'locatedhere',
  });

}

main();
