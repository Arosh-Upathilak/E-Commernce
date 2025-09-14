import React, { /*useEffect,*/useState,useContext } from 'react';
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contex/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify';


const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currentState,setCurrentState] = useState("Login");
    const [data,setData] =useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandle = (event)=>{
      const name =event.target.name
      const value =event.target.value
      setData(data=>({...data,[name]:value}))
    } 
    
    /*check if correct workly
    useEffect(()=>{
      console.log(data)
      console.log("url is",url)
    },[])*/


    const onLogin = async(event)=>{
        event.preventDefault()
        let newUrl = url;

        if(currentState==="Login"){
          newUrl+="/api/user/login"
        }
        else{
          newUrl+="/api/user/register"
        }

        const response =await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("Token",response.data.token)
            toast.success(response.data.message)
            setShowLogin(false)
        }
        else{
          toast.error(response.data.error);
          alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:  
            <input type="text"  name='name' onChange={onChangeHandle} value={data.name} placeholder='Full name' required />}
            <input type="text" name='email' onChange={onChangeHandle} value={data.email} placeholder='User Email' required />
            <input type="password" name='password' onChange={onChangeHandle} value={data.password} placeholder='Password' required />
        </div>
       <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
       <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, eius.</p>
       </div>
       {currentState==="Login"? 
        <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
