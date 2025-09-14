import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../contex/StoreContext';
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    const { cartItem, food_list, removeFromCart ,getTocartTotal,url} = useContext(StoreContext);
    const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-item-title cart-item-item">
                  <img src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
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
              <b>${getTocartTotal()!==0?getTocartTotal()+2:0}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>    
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
