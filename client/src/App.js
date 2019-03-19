import React, { Component } from 'react';
import './App.css';
import { Link, Route, Redirect } from 'react-router-dom';
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
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/artists/" component={ArtistList}/>
        <Route exact path="/artists/id/:id" component={ArtistProfile}/>
        <Route exact path="/artists/id/:id/album" component={EditAlbum}/>
        <Route exact path="/artists/id/:id/album/:album_id" component={EditSong}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
