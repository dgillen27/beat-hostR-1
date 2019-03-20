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
import FileUpload from './components/FileUpload';
import { loginUser, postUser } from './services/apiHelper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      token: '',
      isLogin: false,
      loginData: {
        email: '',
        password: ''
      },
      registerData: {
        userName: '',
        email: '',
        password: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginData: {
        ...prevState.loginData,
        [name]: value
      }
    }))
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const { loginData } = this.state
    // const currentUser = await loginUser(loginData);
    this.setState({
      isLogin: true,
      user: {id: 5}, //change
      loginData: {
        email: '',
        password: ''
      }
    });
    this.props.history.push(`/artists`);
  }

  handleRegisterChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target
    this.setState(prevState => ({
      registerData: {
        ...prevState.registerData,
        [name]: value
      }
    }))
  }

  async handleRegisterSubmit(ev) {
    ev.preventDefault();
    const { registerData } = this.state
    // const lastUser = await postUser(registerData);
    this.setState({
      isLogin: true,
      user: {artist_name: 'eric'}, //change
      registerData: {
        email: '',
        password: '',
        userName: '',
      }
    })
    this.props.history.push("/artists/");
  }

  logOut(ev) {
    this.setState({
      isLogin: false,
      user: {}
    });
    this.props.history.push(`/`);
  }

  componentDidMount() {
  }

  render() {
    const { user, token, isLogin, loginData, registerData } = this.state;
    return (
      <div className="App">
        <Header
          user={user}
          token={token}
          isLogin={isLogin}
          loginData={loginData}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          logOut={this.logOut}
          />
        <Route exact path="/" render={() => (
          <Welcome
            handleRegisterChange={this.handleRegisterChange}
            handleRegisterSubmit={this.handleRegisterSubmit}
            registerData={registerData}
            />
        )}/>
        <Route exact path="/artists/" render={(props) => (
          <ArtistList
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/artists/:id" render={(props) => (
          <ArtistProfile
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/artists/:id/albumform/:album_id" render={(props) => (
          <EditAlbum
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/artists/:id/albumform/:album_id/song/:song_id" render={(props) => (
          <EditSong
            user={user}
            token={token}
            />
        )}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
