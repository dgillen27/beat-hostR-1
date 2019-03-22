import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CreateNewSong from './CreateNewSong';
import { getAlbum, postAlbum, editAlbum, getAlbumSongs, deleteSong, deleteAlbum } from '../services/apiHelper';


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
    this.handleAlbumDelete = this.handleAlbumDelete.bind(this);
    this.updateSongs = this.updateSongs.bind(this);
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
            file: null,
          }
        });
      } catch(e) {
        console.error(e);
      }
    }
  }

  async updateSongs() {
    try {
      const songsResp = await getAlbumSongs(this.props.match.params.userId, this.state.albumId);
      const songs = songsResp.songs;
      this.setState({
        songs
      })
    } catch(e) {
      console.log(e);
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
    const userId = this.props.match.params.userId;
    if (title && genre) {
      const formData = new FormData();
      this.state.file && formData.append('file', this.state.file[0]);
      formData.append('title', title);
      formData.append('genre', genre);
      formData.append('userId', userId);
      const resp = await postAlbum(formData);
      console.log(resp);
      this.setState({
        formError: false,
        albumForm: {
          title: '',
          genre: '',
        },
      });
      this.goBackToUser();
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
      console.log(updatedAlbum);
      this.setState({
        formError: false,
      })
    } else {
      this.setState({
        formError: true,
      })
    }
  }

  async handleAlbumDelete() {
    const {userId} = this.props.match.params;
    const albumId = this.state.album.id;
    try {
      const resp = await deleteAlbum(userId, albumId);
      console.log(resp);
      this.goBackToUser();
    } catch(e) {
      console.log(e);
    }
  }

  async handleSongDelete(songId) {
    const { userId } = this.props.match.params;
    const albumId = this.state.album.id;
    try {
      const resp = await deleteSong(userId, albumId, songId);
      console.log(resp);
      this.updateSongs();
    } catch(e) {
      console.log(e);
    }
  }

  handleFileUpload = (event) => {
    this.setState({
      file: event.target.files
    });
  };

  render() {
    const { title, genre } = this.state.albumForm;
    const { formError, album, songs } = this.state;
    const albumId = this.state.albumId
    return (
      <div className="edit-music">
        <button onClick={() => this.props.history.push(`/users/${this.props.match.params.userId}`)}>Back to Profile</button>
        <div className="edit-create-album">
          <h1>{albumId === 'create' ? 'Create a New Album' : 'Edit Your Album'}</h1>
          <form onSubmit={(ev) => {
            ev.preventDefault();
            return (
            albumId === 'create' ? this.handleNewAlbumSubmit() : this.handleEditAlbumSubmit())}}>
            <label htmlFor="title">Title:</label><br />
            <input
              type="text"
              onChange={this.handleChange}
              id="title"
              name="title"
              value={title} /><br/>
            <label htmlFor="genre">Genre:</label><br />
            <input
              type="text"
              onChange={this.handleChange}
              id="genre"
              name="genre"
              value={genre} /><br />
            {albumId === 'create' &&
              <div>
                <label htmlFor="song-file">Upload your album image:</label><br/>
                <input
                  type='file'
                  name='album-file'
                  label='upload file'
                  onChange={this.handleFileUpload} /><br/>
              </div>
            }
            <button
              type="submit" >{albumId === 'create' ? 'Create a New Album' : 'Edit Your Album'}</button>
          </form>
            {formError && <p className="input-error-message">Please enter a title AND a genre</p>}
          </div>
          { album && <button onClick={this.handleAlbumDelete}>Delete Album</button>}
        { album &&
        <div className="edit-create-song">
          <CreateNewSong
            albumId={this.state.album.id}
            updateSongs={this.updateSongs} />
          <div>
          {songs.map( el => (
            <div key={el.id} className="editing-songs">
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
