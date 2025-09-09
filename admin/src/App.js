import React from 'react'
import Navbar from '../src/components/Navbar/Navbar'
import Sidebar from '../src/components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from '../src/pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  return (
    <div className='App'>
      <ToastContainer/>
        <Navbar />
        <hr />
        <div className='app-content'>
          <Sidebar />
          <Routes>
            <Route index element={<Add url={url} />} />
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
    </div>
  )
}

export default App
