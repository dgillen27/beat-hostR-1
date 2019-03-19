import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import EditAlbum from './EditAlbum';

class ArtistProfile extends Component {
  constructor() {
    super();

    this.state = {
      albums: [{name: 'yea', genre: 'rock', id: 2}, {name: 'no', genre: 'roll', id: 3}],
      songsOfAlbum: [{name: 'oh yeaa', id: 1}, {name: 'oh nooo', id: 2}],
      isArtistUser: true,
      showMore: null,
    }

    this.checkUser = this.checkUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.expandSong = this.expandSong.bind(this);
  }

  checkUser() {
    if (this.props.user.id === this.props.match.params.id) {
      this.setState({
        isArtistUser: true
      })
    }
  }

  handleClick() {
    this.props.history.push("/artists/id/:id/album");
  }

  async getAlbums(artist) {
    // const albums = await getArtistAlbums(artist);
    // this.setState({
    //   albums
    // })
  }

  async getSongs(ev) {
    ev.preventDefault();

    // const songsOfAlbum = await getAlbumSongs(album);
    // this.setState({
    //   songsOfAlbum,
    // })
  }

  async deleteAlbum() {
    // const song = await removeAlbum();
    // this.setState({
    //   albums: this.state.albums.filter(album => (
    //     album !== ev.target.value
    //   ))
    // }) may need to work on this more
  }

  expandSong(idx) {
    // this.setState(prevState => ({
    //   showMore: (idx === prevState.showMore) ? null: idx
    // }))
  }

  componentDidMount() {
    // this.checkUser();
    // this.getAlbums();
  }

  render() {
    const { albums, songs, isArtistUser } = this.state;
    const { user, token, artist } = this.props;

    return (
      <div className="artist-profile">
        <h1>Artist Profile</h1>
        { isArtistUser &&
            <button onClick={this.handleClick}>Create Album</button>
        }
        <div className="albumList">
          {albums.map(album => (
            <div className="album" key={album.id}>
              <p className="album-name">Name: {album.name}</p>
              <p className="album-genre">Genre: {album.genre}</p>
              <button onClick={this.getSongs}>Show Songs</button>
              { isArtistUser &&
                <div>
                  <button onClick={this.handleClick}>Edit Album</button>
                  <button onClick={this.deleteAlbum}>Delete</button>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistProfile);
