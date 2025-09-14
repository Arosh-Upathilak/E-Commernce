import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import {assets} from '../../assets/assets'
import { StoreContext } from '../../contex/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const navigate =useNavigate()

    const {getTocartTotal,token,setToken} =useContext(StoreContext)

    const logout =()=>{
        localStorage.removeItem("Token")
        setToken("")
        navigate("/")
    }

  return (
    <div className='navbar'>
        <Link to=''><img src={assets.logo} alt="" className="logo" /> </Link>
        <ul className="navbar-menu">
            <li className={menu==="home"?"active":""} onClick={()=>setMenu("home")}>home</li>
            <li className={menu==="menu"?"active":""} onClick={()=>setMenu("menu")}>menu</li>
            <li className={menu==="mobile-app"?"active":""} onClick={()=>setMenu("mobile-app")}>mobile-app</li>
            <li className={menu==="contact-us"?"active":""} onClick={()=>setMenu("contact-us")}>contact us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /> </Link>
                <div className={getTocartTotal()===0?"":"dot"}></div>
                
            </div>
            {!token?
            <button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profie'>
                <img src={assets.profile_icon} alt=''/>
                <ul className="nav-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                </ul>
                </div>
            }
        </div>
        
    </div>
  )
}

export default Navbar