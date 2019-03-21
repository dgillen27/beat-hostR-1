import React, { Component } from 'react';
import axios from 'axios';

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

  submitFile = (event) => {
    event.preventDefault();
    const { file, title } = this.state;
    if (file && title) {
      const formData = new FormData();
      formData.append('file', this.state.file[0]);
      formData.append('title', this.state.title);
      formData.append('albumId', this.state.albumId)
      axios.post(`http://localhost:4000/create-song`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(resp => {
        //need to add song to song list
      }).catch(error => {
        console.log(error);
      });
      this.setState({
        title: '',
        formError: false,
      })
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            onChange={this.handleChange}
            id="title"
            name="title"
            value={this.state.title} />
          <input label='upload file' type='file' onChange={this.handleFileUpload} />
          <button type='submit'>Send</button>
        </form>
        { this.state.formError && <p>Please enter a title AND a song file</p>}
      </div>
    );
  }
}

export default CreateNewSong;
