const { User, Album, Song } = require('./models');

//////////////////////////////////////
const main = async () => {

  const user1 = await User.create({
    email: 'user1@email.com',
    password_digest: 'userrrrrrrrrrr1',
    artist_name: 'user1',
  });

  const user2 = await User.create({
    email: 'user2@email.com',
    password_digest: 'userrrrrrrrrrr2',
    artist_name: 'user2',
  });

  //////////////////////////////////////////

  const album1 = await user1.createAlbum({
    title: 'user1 album1',
    genre: 'genre',
  });

  const album2 = await user1.createAlbum({
    title: 'user1 album2',
    genre: 'genre',
  });

  const album3 = await user2.createAlbum({
    title: 'user2 album3',
    genre: 'genre',
  });

  const album4 = await user2.createAlbum({
    title: 'user2 album4',
    genre: 'genre',
  });

  //////////////////////////////////////////

  const song1 = await album1.createSong({
    title: 'song1',
    file_url: 'locatedhere',
  });

  const song2 = await album1.createSong({
    title: 'song2',
    file_url: 'locatedhere',
  });

  const song3 = await album2.createSong({
    title: 'song3',
    file_url: 'locatedhere',
  });

  const song4 = await album2.createSong({
    title: 'song4',
    file_url: 'locatedhere',
  });

  const song5 = await album3.createSong({
    title: 'song5',
    file_url: 'locatedhere',
  });

  const song6 = await album3.createSong({
    title: 'song6',
    file_url: 'locatedhere',
  });

  const song7 = await album4.createSong({
    title: 'song7',
    file_url: 'locatedhere',
  });

  const song8 = await album4.createSong({
    title: 'song8',
    file_url: 'locatedhere',
  });

}

main();
