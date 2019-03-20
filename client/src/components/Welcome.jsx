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
          <input
            onChange={handleRegisterChange}
            placeholder='Username'
            type="text"
            name="artist_name"
            value={registerData.artist_name} />
          <input
            onChange={handleRegisterChange}
            placeholder='Email'
            type="text"
            name="email"
            value={registerData.email} />
          <input
            onChange={handleRegisterChange}
            placeholder='Password'
            type="text"
            name="password"
            value={registerData.password} />
          <input
            onSubmit={handleRegisterSubmit}
            type="submit"
            name="submit"
            value="submit" />
        </form>
      </div>
    )
  }

}

export default Welcome;
