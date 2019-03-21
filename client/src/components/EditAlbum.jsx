import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import EditSong from './EditSong';
import CreateNewSong from './CreateNewSong';
import ArtistProfile from './ArtistProfile';
import { getAlbum, postAlbum, editAlbum, getAlbumSongs, deleteSong } from '../services/apiHelper';


class EditAlbum extends Component {
  constructor() {
    super();

    this.state = {
      album: '',
      songs: [],
      albumForm: {
        title: '',
        genre: '',
      },
      albumId: 'create',
      formError: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleNewAlbumSubmit = this.handleNewAlbumSubmit.bind(this);
    this.handleEditAlbumSubmit = this.handleEditAlbumSubmit.bind(this);
    this.goBackToUser = this.goBackToUser.bind(this);
    this.checkForCreate = this.checkForCreate.bind(this);
    this.handleSongDelete = this.handleSongDelete.bind(this);
  }

  async checkForCreate() {
    if (this.state.albumId !== 'create') {
      try {
        const albumResp = await getAlbum(this.props.match.params.userId, this.state.albumId);
        const album = albumResp.album;
        const songsResp = await getAlbumSongs(this.props.match.params.userId, this.state.albumId);
        const songs = songsResp.songs;
        this.setState({
          album,
          songs,
          albumForm: {
            title: album.title,
            genre: album.genre,
          }
        });
      } catch(e) {
        console.error(e);
      }
    }
  }

  async componentDidMount() {
    const albumId = this.props.match.params.albumId;
    await this.setState({
      albumId
    });
    await this.checkForCreate();
  }

  goBackToUser() {
    const userId = this.props.match.params.userId;
    this.props.history.push(`/users/${userId}`);
  }

  handleChange(ev) {
      const { name, value } = ev.target;
      this.setState(prevState => ({
        albumForm: {
          ...prevState.albumForm,
          [name]: value
        }
      }))
    }

  async handleNewAlbumSubmit() {
    const { title, genre } = this.state.albumForm;
    if (title && genre) {
      const newAlbum = {
        title,
        genre
      }
      const { userId } = this.props.match.params;
      const createdAlbum = await postAlbum(userId, newAlbum);
      this.setState({
        formError: false,
        albumForm: {
          title: '',
          genre: '',
        },
      });
      // this.goBackToUser();
    } else {
      this.setState({
        formError: true,
      });
    };
  }

  async handleEditAlbumSubmit() {
    const { title, genre } = this.state.albumForm;
    const albumId = this.state.album.id;
    const { userId } = this.props.match.params;
    if (title && genre) {
      const editedAlbum = {
        title,
        genre
      }
      const updatedAlbum = await editAlbum(userId, albumId, editedAlbum);
      this.setState({
        formError: false,
      })
      // this.goBackToUser();
    } else {
      this.setState({
        formError: true,
      })
    }
  }

  async handleSongDelete(songId) {
    const { userId } = this.props.match.params;
    const albumId = this.state.album.id;
    try {
      const resp = await deleteSong(userId, albumId, songId);
      //need to remove song from song array so it will reprint
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { title, genre } = this.state.albumForm;
    const { formError, album, songs } = this.state;
    const albumId = this.state.albumId
    return (
      <div className="edit-music">
        <div className="edit-create-album">
          <h1>Edit/Create Album</h1>
          <form onSubmit={(ev) => {
            ev.preventDefault();
            return (
            albumId === 'create' ? this.handleNewAlbumSubmit() : this.handleEditAlbumSubmit())}}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              onChange={this.handleChange}
              id="title"
              name="title"
              value={title} />
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              onChange={this.handleChange}
              id="genre"
              name="genre"
              value={genre} />
            <input
              type="submit" />
          </form>
            {formError && <p className="input-error-message">Please enter a title AND a genre</p>}
          </div>
        { album &&
        <div className="edit-create-song">
          <CreateNewSong
            albumId={this.state.album.id} />
          <div>
          {songs.map( el => (
            <div className="editing-songs">
              <p>{el.title}</p>
              <button id="delete" onClick={(ev) => {
                ev.preventDefault();
                this.handleSongDelete(el.id)
                }}>Delete Song
              </button>
            </div>
          ))}
          </div>
        </div>}
      </div>
    );
  }
}

export default withRouter(EditAlbum);
