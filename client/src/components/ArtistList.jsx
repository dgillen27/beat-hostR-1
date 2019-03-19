import React, { Component } from 'react';


class ArtistList extends Component {
    constructor() {
        super();

        this.state = {
            artists: ['steve', 'jeeve', 'beeve', 'cheeve']
        }
    }
    render() {
      return (
        <div className="artistList" key={this.state.artists}>
                {this.state.artists.map(artist => (
                    <div className="artist" key="">
                        <p>{artist}</p>
                   </div>
                ))}
        </div>
      );
    }
  }

  export default ArtistList;
