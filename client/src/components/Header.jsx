import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Header extends Component {
  constructor(){
    super();
  }

  handleClick(id) {
    this.props.history.push(`/artists/${id}`)
  }

  render() {
    const { user, token, loginData, handleLogin, handleChange, logOut } = this.props;
    return(
      <div className="login">
        <h2>Beat HostR</h2>
        { !token &&
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
              type="text"
              name="password"
              value={loginData.password} />
            <button
              onSubmit={handleLogin}
              type="submit"
              name="submit"
              value="submit" />
          </form>
        }
        {
          token &&
          <div>
            <div>{user.artist_name}</div>
            <div onClick={() => this.handleClick(user.id)}>My Profile</div>
            <div onClick={(ev) => logOut(ev)}>Sign out</div>
          </div>
        }
      </div>
    )
  }

}

export default withRouter(Header);
