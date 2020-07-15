import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
            <input
          type="text"
          value={props.username}
          onChange={props.handleUsernameChange}
          name="Username"
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={props.password}
          onChange={props.handlePasswordChange}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm