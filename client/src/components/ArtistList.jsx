import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getUsers } from '../services/apiHelper';

class ArtistList extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      loading: false,
    }

    this.getAllUsers = this.getAllUsers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.history.push(`/users/${id}`)
  }

  async getAllUsers() {
    const resp = await getUsers();
    this.setState({
      users: resp.users
    })
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className="artistList">
        <h2>Checkout Our Artists</h2>
        {users && users.map(artist => (
          <div className="artist" key={artist.id}>
            <img onClick={() => this.handleClick(artist.id)} src={artist.image_url} alt="" />
            <h3 onClick={() => this.handleClick(artist.id)}>{artist.artist_name}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(ArtistList);
