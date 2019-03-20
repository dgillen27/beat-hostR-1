import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import EditAlbum from './EditAlbum';
import { getArtist, getArtistAlbums, getAlbumSongs, deleteAlbum } from '../services/apiHelper';

class ArtistProfile extends Component {
  constructor() {
    super();

    this.state = {
      currentArtist: {artist_name: 'haha'},
      albums: [{title: 'yea', genre: 'rock', id: 2}, {title: 'no', genre: 'roll', id: 3}, {title: 'yea', genre: 'rock', id: 4}],
      songsOfAlbum: [{title: 'oh yeaa', id: 1}, {title: 'oh nooo', id: 2}],
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

  handleClick(album_id) {
    const id = this.props.match.params.id;
    this.props.history.push(`/artists/${id}/albumform/${album_id}`);
  }

  async getArtist() {
      // const currentArtist = await getArtist(this.props.match.params.id);
      // this.setState({
      //   currentArtist
      // })
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

  async deleteAlbum(ev) {
    ev.preventDefault();
    // const song = await deleteAlbum();
    this.setState({
      albums: this.state.albums.filter(album => (
        album.id !== Number(ev.target.id)
      ))
    })
  }

  expandSong(idx) {
    // this.setState(prevState => ({
    //   showMore: (idx === prevState.showMore) ? null: idx
    // }))
  }

  componentDidMount() {
    // this.checkUser();
    // this.getArtist();
    // this.getAlbums();
  }

  render() {
    const { albums, songs, isArtistUser, currentArtist } = this.state;
    const { user, token, artist } = this.props;

    return (
      <div className="artist-profile">
        <div onClick={() => this.props.history.push('/artists')}>Back to Artists</div>
        <h1>{currentArtist.artist_name}</h1>
        { isArtistUser &&
            <div onClick={() => this.handleClick(albums.length + 1)}>Create Album</div>
        }
        <div className="albumList">
          {albums.map((album, id) => {
            return (
              <div className="album" key={album.id}>
                <p className="album-name">Name: {album.title}</p>
                <p className="album-genre">Genre: {album.genre}</p>
                <div onClick={this.getSongs}>Show Songs</div>
                { isArtistUser &&
                  <div>
                    <div onClick={() => this.handleClick(id + 1)}>Edit Album</div>
                    <button id={album.id} onClick={(ev) => this.deleteAlbum(ev)}>Delete</button>
                  </div>
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistProfile);
