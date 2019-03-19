import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import EditSong from './EditSong';

class EditAlbum extends Component {
  constructor() {
    super();

    this.state = {
      albumForm: {
        name: 'hello',
        genre: 'my',
      },
      songsOfAlbum: [{name: 'oh yeaa', id: 1}, {name: 'oh nooo', id: 2}]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.createSong = this.createSong.bind(this);
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
    ev.preventDefault();
    const { name, genre } = this.state.albumForm;
    const newAlbum = {
      name,
      genre
    }
    // const lastAlbum = await postAlbum(newAlbum);
    // redirect to artistProfile page
  }

  async handleEditSubmit(ev) {
    ev.preventDefault();
    const { name, genre } = this.state.albumForm;
    const newAlbum = {
      name,
      genre
    }
    // const lastAlbum = await editAlbum(newAlbum);
    // redirect to artistProfile page
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
    // this.setState({
    //   songsOfAlbum: this.state.songsOfAlbum.filter(song => (
    //     song !== ev.target.value
    //   ))
    // }) may need to work on this more
  }

  async createSong() {
    // route to editSong component
  }

  componentDidMount() {
    // this.setState({
    //   albumForm: {
    //     name: {this.props.name}
    //     genre: {this.props.genre}
    //   }
    // })
  }

  render() {
    const { name, genre } = this.state.albumForm;
    const { songsOfAlbum } = this.state;
    return (
      <div className="edit-album">
        <h1>Edit/Create Album</h1>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="name"
            name="name"
            value={name}
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
            onSubmit={this.handleSubmit}
            />
        </form>
        <div className="song-list">
          <div>All Songs</div>
          <button onClick={this.createSong}>Add Song</button>
          {songsOfAlbum.map(song => (
            <div className="artist" key={song.id}>
              <p>{song.name}</p>
              <button onClick={this.deleteSong}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EditAlbum;
