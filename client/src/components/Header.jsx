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
          token &&
          <div className='after-login'>
            <p>{user.artist_name}</p>
            <p onClick={() => this.handleClick(user.id)}>My Profile</p>
            <p onClick={(ev) => logOut(ev)}>Sign out</p>
          </div>
        }
      </div>
    )
  }

}

export default withRouter(Header);
