import React, { Component } from 'react';

class Header extends Component {
  constructor(){
    super();

    this.state = {
      loginData: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    // const lastUser = await loginUser(loginData);
  }

  render() {
    return(
      <div className="login">
        <h1 class="BeatHostr">BeatHostR</h1><center><img src="https://bit.ly/2uhcGYW" id="logo" /> </center>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder='Email' type="text" name="email" value={this.email} />
          <input onChange={this.handleChange} placeholder='Password' type="text" name="password" value={this.password} />
          <input onSubmit={this.handleSubmit} type="submit" name="submit" value="submit" />
        </form>
        </div>
    )
  }

}

export default Header;
