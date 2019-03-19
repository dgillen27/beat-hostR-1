import React, { Component } from 'react';


class Welcome extends Component {
  constructor(){
    super();

      this.state = {
        registerData: {
          userName: '',
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
      registerData: {
        ...prevState.registerData,
        [name]: value
      }
    }))
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const { registerData } = this.state
    // const lastUser = await postUser(registerData);
    this.props.history.push("/artists/");
  }

  render() {
    return(
      <div className="welcome">
        <h2>Welcome Component</h2>
        <button type="button">Enter as Guest</button>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder='Username' type="text" name="userName" value={this.userName} />
          <input onChange={this.handleChange} placeholder='Email' type="text" name="email" value={this.email} />
          <input onChange={this.handleChange} placeholder='Password' type="text" name="password" value={this.password} />
          <input onSubmit={this.handleSubmit} type="submit" name="submit" value="submit" />
        </form>
      </div>
    )
  }

}

export default Welcome;
