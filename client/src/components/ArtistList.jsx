import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ArtistList extends Component {
  constructor() {
    super();

    this.state = {
      artists: [{name: 'sam', id: 1}, {name: 'lee', id: 2}]
    }

    this.getArtists = this.getArtists.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/artists/id/:id")
  }

  async getArtists() {
    // const artists = await getAllArtists();
    // this.setState({
    //   artists
    // })
  }

  componentDidMount() {
    // this.getArtists();
  }

  render() {
    const { artists } = this.state;
    return (
      <div className="artistList">
        {artists.map(artist => (
          <div className="artist" key={artist.id}>
            <div onClick={this.handleClick}>{artist.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(ArtistList);
