import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistProfile from './components/ArtistProfile';
import EditAlbum from './components/EditAlbum';
import ArtistList from './components/ArtistList';
import { loginUser, postUser, updateToken } from './services/apiHelper';
const jwt = require('jsonwebtoken');

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
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
    try {
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
    } catch (e) {
      console.log(e);
    }
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
    try {
      const resp = await postUser(registerData);
      localStorage.setItem('authToken', resp.token)
      this.setState({
        token: resp.token,
        user: jwt.decode(resp.token),
        registerData: {
          email: '',
          password: '',
          artist_name: '',
        }
      })
      this.props.history.push("/users");
    } catch(e) {
      console.log(e);
    }
  }

  logOut(ev) {
    ev.preventDefault();
    localStorage.clear();
    updateToken('');
    this.setState({
      user: null,
      token: '',
    });
    this.props.history.push(`/`);
  }

  async setCurrentUser() {
    const user = jwt.decode(localStorage.getItem("authToken"))
    this.setState({
      user: user
    })
    console.log(jwt.decode(localStorage.getItem("authToken")));
    console.log(this.state.user);
  }

  async componentDidMount() {
    localStorage.getItem("authToken") && await this.setCurrentUser();
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
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
