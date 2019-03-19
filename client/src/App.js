import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistProfile from './components/ArtistProfile';
import Song from './components/Song';
import EditAlbum from './components/EditAlbum';
import EditSong from './components/EditSong';
import ArtistList from './components/ArtistList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {id: 1},
      token: 'hello',
    }
  }

  // handleLoginButton() {
  //   this.props.history.push("/artists/id/:id")
  // }

  componentDidMount() {

  }

  render() {
    const { user, token } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          <ArtistProfile />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
