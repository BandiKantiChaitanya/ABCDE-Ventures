import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { setAuthToken } from '../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Username and password are required')
      return
    }

    try {
      const res = await api.post('/users/login', { username, password })
      const token = res.data.token

      localStorage.setItem('token', token)
      setAuthToken(token)

      navigate('/items')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password')
    }
  }

  return (
    <div className="page-wrapper">
      <div className="card-container">
        <div className="card-header">
          <h2>Welcome Back</h2>
          <p>Login to continue shopping</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError('')
                }}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          <p className="text-link">
            New user? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
