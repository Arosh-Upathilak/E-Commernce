import React , { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../contex/StoreContext';


const PlaceOrder = () => {
  const { getTocartTotal} = useContext(StoreContext);
  return (
    <form action="" className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-displays">
              <p>Subtotal</p>
              <p>${getTocartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-displays">
              <p>Delivery Fee</p>
              <p>${getTocartTotal()!==0?2:0}</p>
            </div>
            <hr />
            <div className="cart-total-displays">
              <b>Total</b>
              <b>${getTocartTotal()!==0?getTocartTotal() + 2:0}</b>
            </div>
          </div>
          <button>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;