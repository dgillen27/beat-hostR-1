import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { postSong } from '../services/apiHelper';

class EditSong extends Component {
  constructor() {
    super();

    this.state = {
      songForm: {
        title: '',
        file_url: '',
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
      const { name, value } = ev.target;
      this.setState(prevState => ({
        songForm: {
          ...prevState.songForm,
          [name]: value
        }
      }))
    }

  async handleSubmit(ev) {
    ev.preventDefault();
    const { title, file_url } = this.state.songForm;
    const newSong = {
      title,
      file_url
    }
    // const lastSong = await postSong(newSong);
    const id = this.props.match.params.id;
    const album_id = this.props.match.params.album_id;
  }


  componentDidMount() {
  }

  render() {
    const { title, file_url } = this.state.songForm;
    return (
      <div className="edit-album">
        <h1>Create Song</h1>
        <form onSubmit={this.handleSubmit}>
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

          <label htmlFor="file-url">
            File:
          </label>
          <input
            type="submit"
            />
        </form>
      </div>
    );
  }
}

export default withRouter(EditSong);
