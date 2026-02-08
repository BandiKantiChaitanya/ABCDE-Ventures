import React from 'react'
import { useNavigate } from 'react-router-dom'
import api, { setAuthToken } from '../services/api'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await api.post('/users/logout')
      localStorage.removeItem('token',token)

    } catch (err) {
      console.log(err)
    }

    localStorage.removeItem('token')
    setAuthToken(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
    <div className="navbar-container">
        <div className="navbar-brand">ABCDE Ventures</div>
        <button className="btn-logout" onClick={logout}>Logout</button>
    </div>
    </nav>
  )
}

export default Navbar