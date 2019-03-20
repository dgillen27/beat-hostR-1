import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import EditSong from './EditSong';
import ArtistProfile from './ArtistProfile';
import { postAlbum, editAlbum, getAlbumSongs, deleteSong } from '../services/apiHelper';


class EditAlbum extends Component {
  constructor() {
    super();

    this.state = {
      albumForm: {
        title: '',
        genre: '',
      },
      songsOfAlbum: [{title: 'oh yeaa', id: 1}, {title: 'oh yeaa', id: 3}, {title: 'oh nooo', id: 2}]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.createSong = this.createSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const id = this.props.match.params.id;
    this.props.history.push(`/artists/${id}`);
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

  async handleNewSubmit(ev) {
    const { title, genre } = this.state.albumForm;
    const newAlbum = {
      title,
      genre
    }
    // const lastAlbum = await postAlbum(newAlbum);
    this.handleSubmit();
  }

  async handleEditSubmit(ev) {
    const { title, genre } = this.state.albumForm;
    const newAlbum = {
      title,
      genre
    }
    // const lastAlbum = await editAlbum(newAlbum);
    this.handleSubmit();
  }

  async getSongs(ev) {
    ev.preventDefault();

    // const songsOfAlbum = await getAlbumSongs(album);
    // this.setState({
    //   songsOfAlbum,
    // })
  }

  async deleteSong(ev) {
    ev.preventDefault();
    // const deletedSong = await deleteSong();
    this.setState({
      songsOfAlbum: this.state.songsOfAlbum.filter(song => (
        song.id !== Number(ev.target.id)
      ))
    })
  }

  createSong(song_id) {
    const id = this.props.match.params.id;
    const album_id = this.props.match.params.album_id;
    this.props.history.push(`/artists/${id}/albumform/${album_id}/songform/${song_id}`)
  }

  componentDidMount() {
    // this.setState({
    //   albumForm: {
    //     title: {this.props.title}
    //     genre: {this.props.genre}
    //   }
    // })
  }

  render() {
    const { title, genre } = this.state.albumForm;
    const { songsOfAlbum } = this.state;
    return (
      <div className="edit-album">
        <h1>Edit/Create Album</h1>
        <form onSubmit={this.handleEditSubmit}>

          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="title"
            name="title"
            value={title}
            />

          <label htmlFor="genre">
            Genre:
          </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="genre"
            name="genre"
            value={genre}
            />

          <input
            type="submit"
            onSubmit={this.handleEditSubmit}
            />
        </form>
        <div className="song-list">
          <div>All Songs</div>
          <button onClick={() => this.createSong(songsOfAlbum.length + 1)}>Add Song</button>
          {songsOfAlbum.map(song => (
            <div className="artist" key={song.id}>
              <p>{song.title}</p>
              <button id={song.id} onClick={(ev) => this.deleteSong(ev)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(EditAlbum);
