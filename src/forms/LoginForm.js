import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          onChange={handleUsernameChange}
          name="Username"
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="Password"
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm