import React, { Component } from 'react';
import axios from 'axios';
import { postSong } from '../services/apiHelper';

// Found from medium article
// https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd

class CreateNewSong extends Component {
  constructor () {
    super();
    this.state = {
      albumId: '',
      file: null,
      title: '',
      formError: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      albumId: this.props.albumId
    });
  }

  submitFile = async (event) => {
    event.preventDefault();
    const { file, title } = this.state;
    if (file && title) {
      const formData = new FormData();
      formData.append('file', this.state.file[0]);
      formData.append('title', this.state.title);
      formData.append('albumId', this.state.albumId)
      const resp = await postSong(formData);
      console.log(resp);
      this.setState({
        title: '',
        formError: false,
      })
      this.props.updateSongs();
    } else {
      this.setState({
        formError: true,
      })
    }
  }

  handleChange(ev) {
      const { name, value } = ev.target;
      this.setState(prevState => ({
          [name]: value
      }));
    }

  handleFileUpload = (event) => {
    this.setState({
      file: event.target.files
    });
  };

  render () {
    return (
      <div>
        <p>Make a new Song:</p>
        <form onSubmit={this.submitFile}>
          <label htmlFor="title">Title:</label><br/>
          <input
            type="text"
            onChange={this.handleChange}
            id="title"
            name="title"
            value={this.state.title} /><br/>
          <label htmlFor="song-file">Upload your song file:</label><br/>
          <input
            type='file'
            name='song-file'
            label='upload file'
            onChange={this.handleFileUpload} /><br/>
          <button type='submit'>Add song to album</button>
        </form>
        { this.state.formError && <p>Please enter a title AND a song file</p>}
      </div>
    );
  }
}

export default CreateNewSong;
