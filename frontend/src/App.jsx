import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ItemList from './components/ItemList'

const App = () => {
  
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items" element={<ItemList />} />
      </Routes>
  )
}

export default App
