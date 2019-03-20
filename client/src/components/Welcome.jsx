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
        <h2>Register Here</h2>
        <form onSubmit={this.handleSubmit}>
          <h3>Name</h3>
          <input onChange={this.handleChange} type="text" name="userName" value={this.userName} />
          <h3>Email</h3>
          <input onChange={this.handleChange} type="text" name="email" value={this.email} />
          <h3>Password</h3>
          <input onChange={this.handleChange} type="text" name="password" value={this.password} />
          <h3>Submit or Enter as Guest</h3>
          <button onSubmit={this.handleSubmit} type="submit" name="submit" value="submit">Submit</button>
        </form>
        <button id="guest" type="button">Enter as Guest</button>
      </div>
    )
  }

}

export default Welcome;
