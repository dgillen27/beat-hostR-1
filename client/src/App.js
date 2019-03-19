import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistList from './components/ArtistList'
import Song from './components/Song'

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      token: '',
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Header />
        <h1>Welcome to the Beat HostR</h1>
        <Welcome />
        <ArtistList />
        <Song />
        <Footer />
      </div>
    );
  }
}

export default App;
