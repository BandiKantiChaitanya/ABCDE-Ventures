import React from 'react'

const Modal = ({ title, items, onClose }) => {
  const groupItems = items => {
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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {title === 'Your Orders' ? (
              items.length === 0 ? (
                <p className="text-center text-muted">No orders found</p>
              ) : (
                items.map(order => {
                  const groupedOrderItems = groupItems(order.items || [])
                  return (
                    <div key={order._id} className="mb-4 pb-3 border-bottom">
                      <h6 className="text-primary mb-3">Order ID: {order._id}</h6>
                      {groupedOrderItems.length > 0 ? (
                        <ul className="list-group">
                          {groupedOrderItems.map(item => (
                           <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex flex-column">
                                <span className="fw-semibold">{item.name}</span>
                                <small className="text-muted">ID: {item._id}</small>
                            </div>
                            <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                                x{item.count}
                            </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted fst-italic">No items in this order</p>
                      )}
                    </div>
                  )
                })
              )
            ) : (
              // Cart
              items.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty</p>
              ) : (
                <ul className="list-group">
                  {items.map(item => (
                     <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                        <div className="d-flex flex-column">
                            <span className="fw-semibold">{item.name}</span>
                            <small className="text-muted">ID: {item._id}</small>
                        </div>
                        <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                            x{item.count}
                        </span>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal