import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { loginUser } from '../services/apiHelper';

class Header extends Component {
  constructor(){
    super();

    this.state = {
      loginData: {
        email: '',
        password: ''
      },
      isLogin: false,
      currentUser: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      currentUser: {artist_name: 'eric'} //change
    });
    this.props.history.push(`/artists`);
  }

  logOut(ev) {
    this.setState({
      isLogin: false,
      currentUser: {}
    });
    this.props.history.push(`/`);
  }

  render() {
    const { isLogin, currentUser } = this.state;
    return(
      <div className="login">
        <h2>Header</h2>
        { !isLogin &&
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              placeholder='Email'
              type="text"
              name="email"
              value={this.email} />
            <input
              onChange={this.handleChange}
              placeholder='Password'
              type="text"
              name="password"
              value={this.password} />
            <input
              onSubmit={this.handleSubmit}
              type="submit"
              name="submit"
              value="submit" />
          </form>
        }
        {
          isLogin &&
          <div>
            <div>{currentUser.artist_name}</div>
            <div onClick={(ev) => this.logOut(ev)}>Sign out</div>
          </div>

        }
      </div>
    )
  }

}

export default withRouter(Header);
