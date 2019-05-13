import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Header extends Component {
  constructor(){
    super();
    this.handleClickAllUsers = this.handleClickAllUsers.bind(this);
    this.handleClickMyProfile = this.handleClickMyProfile.bind(this);
  }

  handleClickMyProfile(id) {
    this.props.history.push(`/users/${id}`);
  }

  handleClickAllUsers(ev) {
    ev.preventDefault();
    this.props.history.push('/users');
  }

  render() {
    const { user, token, loginData, handleLogin, handleChange, logOut } = this.props;
    return(
      <div className="login">
        <h2 onClick={this.handleClickAllUsers}>Beat HostR</h2>
        { !user &&
          <form onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              placeholder='Email'
              type="text"
              name="email"
              value={loginData.email} />
            <input
              onChange={handleChange}
              placeholder='Password'
              type="password"
              name="password"
              value={loginData.password} />
            <button
              onSubmit={handleLogin}
              type="submit"
              name="submit"
              value="submit">Submit</button>
          </form>
        }
        {
          user &&
          <div className='after-login'>
            <p>{user.artist_name}</p>
            <p onClick={() => this.handleClickMyProfile(user.id)}>My Profile</p>
            <p onClick={(ev) => logOut(ev)}>Sign out</p>
          </div>
        }
      </div>
    )
  }

}

export default withRouter(Header);
