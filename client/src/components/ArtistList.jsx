import React, { Component } from 'react';
import './App.css';

class ArtistList extends Component { 
    constructor() {
        super();
        
        this.state = {
            artists: ['steve', 'jeeve', 'beeve']
        }
    }
    render() {
      return (
        <div className="ArtistList">
                {artists.map(artist => (
                    <div className= "Artist">
                        <Link to ={`/artists/id/${id}`}>{Artist}</Link>
           </div>
        )
        )
        }})
          }
          </div> 

export default ArtistList;