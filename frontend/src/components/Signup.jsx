import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // validations
    if (!username || !password) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await api.post('/users', { username, password })
      setSuccess('Signup successful! Redirecting to login...')
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="page-wrapper">
      <div className="card-container">
        <div className="card-header">
          <h2>Sign Up</h2>
          <p>Create your account to get started</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSignup}>
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

            {error && <p className="error-text text-danger">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit" className="btn-primary">
              Register
            </button>
          </form>

          <p className="text-link">
            Already Registered? <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
