import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getAllArtists } from '../services/apiHelper';

class ArtistList extends Component {
  constructor() {
    super();

    this.state = {
      artists: [
        {artist_name: 'Sam', image: 'https://i.pinimg.com/originals/5a/e5/8f/5ae58f5036997cfd4636917403c3c951.jpg', id: 1},
        {artist_name: 'Lee', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NrtLz5hVxQgROJksDI3jPHj0Uu4c763x35bQlTBM9g_zRZaJ', id: 2},
        {artist_name: 'Tee', image: 'https://cms.qz.com/wp-content/uploads/2017/01/psychedelic-pattern.jpg?quality=75&strip=all&w=410&h=231', id:3},
        {artist_name: 'Jee', image: 'https://2355qj18gs661xupcu3zgegq-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/dangers-of-psychedelics-e1461094853487-1024x650.jpg', id:4},
        {artist_name: 'Vee', image: 'https://www.orbmag.com/wp-content/uploads/2018/03/TAS-Wave-2016-min-1250x594.png', id:5},
        {artist_name: 'Kee', image: 'https://previews.123rf.com/images/objowl/objowl1208/objowl120800017/14979666-psychedelic-rosette-digital-abstract-image-with-a-circular-psychedelic-design-in-green-blue-purple-a.jpg', id:6},
        {artist_name: 'Jeeve', image: 'https://cdn.pixabay.com/photo/2015/12/09/01/02/colorful-abstract-background-1084082__340.jpg', id:7},
        {artist_name: 'Potato', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaLxpSMqehWZQQsJeFUd5yQEkZEAbezxHiLHQLQ6waZMR-SAd', id:8 },
        {artist_name: 'Jotato', image: 'https://i.ytimg.com/vi/vJDISmFGbMQ/maxresdefault.jpg', id:9 },
        {artist_name: 'Brotato', image: 'https://preview.redd.it/aesxjss442n21.jpg?width=640&crop=smart&auto=webp&s=dbc2058f5d0654c347c302c7c122ec6220cecfd2', id:10 },
        {artist_name: 'Ham', image: 'https://external-preview.redd.it/dNfnsKObaWhZ7PXVpTq1h8NqLemwvXFHuYjuRuoZDbo.jpg?width=640&crop=smart&auto=webp&s=63ab4b3658722043bb8d80f210c9950ec5eb567e', id:11 },
        {artist_name: 'Sam', image: 'https://preview.redd.it/cbdmkm73o5n21.jpg?width=640&crop=smart&auto=webp&s=e6ec43c10301f2de115d94577ea6e928a30b34fd', id:12 },
        {artist_name: 'Pam', image: 'https://preview.redd.it/9m24k2gsb4n21.jpg?width=640&crop=smart&auto=webp&s=5a9e79858c82f2124169cda9b04718d2dcbd4f51', id:13 },
        {artist_name: 'Cham', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9jAekxrPPi2imFluawJcl0AnsIU17xraf8Ew2awm-ELqcfxb', id:14 },
        {artist_name: 'Bam', image: 'https://preview.redd.it/p80s3z0kl5n21.jpg?width=640&crop=smart&auto=webp&s=d7d1fa1f957b0a227a129dd91ba8d81920ec6935', id:15 },
        {artist_name: 'Lamb', image: 'https://preview.redd.it/vn6pcm9345n21.jpg?width=640&crop=smart&auto=webp&s=a718920928f79c760aad6ab67c1eb936cca055f5', id:16 },
        {artist_name: 'Boo', image: 'https://preview.redd.it/dn7vqat1v5n21.jpg?width=640&crop=smart&auto=webp&s=1f0809e7ef31ea94fbc9b3e94d87a03a471eb223', id:17 },
        {artist_name: 'Choo', image: 'https://i.redd.it/zyoarph3a4n21.jpg', id:18 }
      ]
    }

    this.getArtists = this.getArtists.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.history.push(`/artists/${id}`)
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
        <h2>Checkout Our Artists</h2>
        {artists.map(artist => (
          <div className="artist" key={artist.id}>
            <img onClick={() => this.handleClick(artist.id)} src={artist.image} alt=""></img>
            <h3 onClick={() => this.handleClick(artist.id)}>{artist.artist_name}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(ArtistList);
