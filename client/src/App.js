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
      loginData: {
        email: '',
        password: '',
      },
      registerData: {
        artist_name: '',
        email: '',
        password: '',
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

  async handleLogin(ev) {
    ev.preventDefault();
    const { loginData } = this.state
    const resp = await loginUser(loginData);
    this.setState({
      user: resp.user,
      token: resp.token,
      loginData: {
        email: '',
        password: ''
      }
    });
    this.props.history.push(`/users`);
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

  async handleRegister(ev) {
    ev.preventDefault();
    const { registerData } = this.state
    const resp = await postUser(registerData);
    this.setState({
      token: resp.token,
      user: resp.user,
      registerData: {
        email: '',
        password: '',
        artist_name: '',
      }
    })
    this.props.history.push("/users");
  }

  logOut(ev) {
    this.setState({
      user: {},
      token: '',
    });
    this.props.history.push(`/`);
  }

  componentDidMount() {
  }

  render() {
    const { user, token, registerData, loginData } = this.state;
    return (
      <div className="App">
        <Header
          user={user}
          token={token}
          loginData={loginData}
          handleLogin={this.handleLogin}
          handleChange={this.handleChange}
          logOut={this.logOut}
          />
          <FileUpload />
        <Route exact path="/" render={() => (
          <Welcome
            handleRegisterChange={this.handleRegisterChange}
            handleRegister={this.handleRegister}
            registerData={registerData}
            />
        )}/>
        <Route exact path="/users/" render={(props) => (
          <ArtistList
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/users/:userId" render={(props) => (
          <ArtistProfile
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/users/:userId/albumform/:albumId" render={(props) => (
          <EditAlbum
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/users/:userId/albumform/:albumId/songform/:songId" render={(props) => (
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
