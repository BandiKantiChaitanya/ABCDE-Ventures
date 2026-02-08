import React, { useEffect, useState } from 'react'
import api, { setAuthToken } from '../services/api'
import Navbar from './Navbar'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

const ItemList = () => {
  const [items, setItems] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalItems, setModalItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()



  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
        navigate('/')
    }
    setAuthToken(token)
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
        setLoading(true)
        const res = await api.get('/items')
        setItems(res.data)
    } catch (err) {
        alert('Failed to fetch items')
    } finally {
        setLoading(false)
    }
}


  const addToCart = async (itemId) => {
    try {
      await api.post('/carts', { itemIds: [itemId] })
      alert('Item added to cart')
    } catch (err) {
      console.error(err)
      alert('Failed to add item to cart')
    }
  }

  const groupCartItems = items => {
  const map = {}

  items.forEach(item => {
    if (map[item._id]) {
      map[item._id].count += 1
    } else {
      map[item._id] = {
        ...item,
        count: 1
      }
    }
  })

  return Object.values(map)
}


  const viewCart = async () => {
  try {
    const res = await api.get('/carts')

    const groupedItems = groupCartItems(res.data.items || [])

    setModalTitle('Your Cart')
    setModalItems(groupedItems)
    setShowModal(true)
  } catch {
    alert('Failed to fetch cart')
  }
}



  const viewOrders = async () => {
    try {
        const res = await api.get('/orders')

        setModalTitle('Your Orders')
        setModalItems(res.data)
        setShowModal(true)
    } catch (err) {
        alert('Failed to fetch orders')
    }
 }




  const checkout = async () => {
  try {
    const cartRes = await api.get('/carts')

    if (!cartRes.data.items || cartRes.data.items.length === 0) {
      alert('Your cart is empty')
      return
    }

    await api.post('/orders')
    alert('Order successful')

    setModalItems([])
    setShowModal(false)
  } catch (err) {
    alert('Checkout failed')
  }
}


  return (
    <div className="items-page">
      <Navbar />
      <div className="items-container">
        <div className="items-header">
          <h3 className="items-title">Available Items</h3>
          <div className="items-actions">
            <button className="btn-secondary " onClick={viewCart}>Cart</button>
            <button className="btn-secondary " onClick={viewOrders}>Orders</button>
            <button className="btn-primary align " onClick={checkout}>✓ Checkout</button>
          </div>
        </div>
        {loading ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div className="spinner-border text-primary"></div>
        </div>
        ) : (
        <div className="items-grid">
            {items.map(item => (
            <div className="item-card" key={item._id}>
               <img src={`https://placehold.co/300x200/f08940/ffffff?text=${encodeURIComponent(item.name)}&font=bold&font-size=24`} alt={item.name} />
                <div className="item-name">{item.name}</div>
                <button
                className="btn-primary"
                onClick={() => addToCart(item._id)}
                >
                Add to Cart
                </button>
            </div>
            ))}
        </div>
        )}
      </div>
      {showModal && (
        <Modal
            title={modalTitle}
            items={modalItems}
            onClose={() => setShowModal(false)}
        />
        )}
    </div>
  )
}

export default ItemList