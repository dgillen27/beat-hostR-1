import React, { Component } from 'react';


class ArtistList extends Component {
  constructor() {
    super();

    this.state = {
      artists: [{name: 'sam', id: 1}, {name: 'lee', id: 2}]
    }

    this.getArtists = this.getArtists.bind(this);
  }

  handleClick() {
    this.props.history.push("/login")
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
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ArtistList;
