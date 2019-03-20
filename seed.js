const { User, Album, Song } = require('./models');

//////////////////////////////////////
const main = async () => {

  const users = [];

  for(let i = 0; i < 10; i++) {
    users[i] = await User.create({
      email: `user${i}@email.com`,
      password_digest: `user${i}`,
      artist_name: `user${i}`
    });
  };

//////////////////////////////////////////

  const albums = [];
  const albumsPerUser = 3;

  for(let i = 0; i < users.length; i++) {
    for(let j = 0; j < albumsPerUser; j++) {
      albums[(i * albumsPerUser) + j] = await users[i].createAlbum({
        title: `user${i} album${j}`,
        genre: `genre`,
      });
    };
  };

  console.log(albums.length);

  //////////////////////////////////////////

  const songs = [];
  const songsPerAlbum = 5;

  for (let i = 0; i < albums.length; i++) {
    for (let j = 0; j < songsPerAlbum; j++) {
      songs[(i * songsPerAlbum) + j] = await albums[i].createSong({
        title: `album${i} song${j}`,
        file_url: `https://s3.amazonaws.com/beathostr/bucketFolder/1553040082067-lg.m4a`,
      });
    };
  };

  console.log(songs.length);

};

main();
