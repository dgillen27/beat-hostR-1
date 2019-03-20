import React, { Component } from 'react';

class Welcome extends Component {
  constructor(){
    super();
  }

  render() {
    const { handleRegisterSubmit, handleRegisterChange, registerData } = this.props;
    return(
      <div className="welcome">
        <h2>Welcome Component</h2>
        <form onSubmit={handleRegisterSubmit}>
          <h3>Name</h3>
          <input
            onChange={handleRegisterChange}
            placeholder='Username'
            type="text"
            name="artist_name"
            value={registerData.artist_name} />
          <h3>Email</h3>
          <input
            onChange={handleRegisterChange}
            placeholder='Email'
            type="text"
            name="email"
            value={registerData.email} />
          <h3>Password</h3>
          <input
            onChange={handleRegisterChange}
            placeholder='Password'
            type="text"
            name="password"
            value={registerData.password} />
          <h3>Submit or Enter as Guest</h3>
          <button
            onSubmit={handleRegisterSubmit}
            type="submit"
            name="submit"
            value="submit" />
        </form>
        <button id="guest" type="button">Enter as Guest</button>
      </div>
    )
  }

}

export default Welcome;
