import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

class EditSong extends Component {
  constructor() {
    super();

    this.state = {
      songForm: {
        name: '',
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
    const { name, file_url } = this.state.songForm;
    const newSong = {
      name,
      file_url
    }
    // const lastSong = await postSong(newSong);
    this.props.history.push("/artists/id/:id/album")
  }


  componentDidMount() {
  }

  render() {
    const { name, file_url } = this.state.songForm;
    return (
      <div className="edit-album">
        <h1>Create Song</h1>
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

          <label htmlFor="file-url">
            File URL:
          </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="file-url"
            name="file_url"
            value={file_url}
            />

          <input
            type="submit"
            onSubmit={this.handleSubmit}
            />
        </form>
      </div>
    );
  }
}

export default withRouter(EditSong);
