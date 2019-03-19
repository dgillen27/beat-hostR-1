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
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target
    this.setState(prevState => ({
      loginData: {
        ...prevState.loginData,
        [name]: value
      }
    }))
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { loginData } = this.state
    await this.handleLogin(loginData);
  }

  handleLogin(loginData){
    {/*Soon to login user*/}
    console.log(loginData);
  }

  render() {
    return(
      <div className="login">
        <h2>Header</h2>
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
