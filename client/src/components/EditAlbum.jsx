import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import EditSong from './EditSong';
import ArtistProfile from './ArtistProfile';

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
    const { name, genre } = this.state.albumForm;
    const newAlbum = {
      name,
      genre
    }
    // const lastAlbum = await postAlbum(newAlbum);
    this.handleSubmit();
  }

  async handleEditSubmit(ev) {
    const { name, genre } = this.state.albumForm;
    const newAlbum = {
      name,
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
    // this.setState({
    //   songsOfAlbum: this.state.songsOfAlbum.filter(song => (
    //     song !== ev.target.value
    //   ))
    // }) may need to work on this more
  }

  createSong(album_id) {
    const id = this.props.match.params.id;
    this.props.history.push(`/artists/${id}/album/${album_id}`)
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
        <form onSubmit={this.handleEditSubmit}>

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
            onSubmit={this.handleEditSubmit}
            />
        </form>
        <div className="song-list">
          <div>All Songs</div>
          <button onClick={() => this.createSong(3)}>Add Song</button>
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

export default withRouter(EditAlbum);
