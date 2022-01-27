import React from 'react'
import {
  Link
} from "react-router-dom";
import { encryptStorage } from '../config/Encrypt'
import { useState, useEffect } from 'react';
import Clockcomponent from './Clockcomponent';
import { Badge,Image } from 'react-bootstrap';
import '../index.css'
import {useSelector} from 'react-redux'
function Navbar() {
  const [cart, setcart] = useState([])
  const [state, setstate] = useState("")
  const count = useSelector(state => state.count)
  useEffect(() => {

    if(encryptStorage.getItem('cart')==undefined){
      encryptStorage.setItem('cart',[])
    }
    setcart(encryptStorage.getItem('cart'))
   // console.log(encryptStorage.getItem('user'))
  }, [])

  
  const dashboardcomponent = encryptStorage.getItem('user') != undefined ? <>

    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to={`/dashboard`} style={{   textDecoration: "none" }} className="changefont">Dashboard</Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/menu" style={{   textDecoration: "none" }} className="changefont">Menu</Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/addmenu" style={{   textDecoration: "none" }} className="changefont">Add Menu</Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/logout" style={{   textDecoration: "none" }} className="changefont">Logout</Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/cart" style={{   textDecoration: "none" }} className="changefont">Cart <Badge bg="secondary" style={{color:"black"}} >{count}</Badge></Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/historycart" style={{   textDecoration: "none" }} className="changefont">History Cart </Link>
    </li>
    <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
      <Link to="/checkout" style={{   textDecoration: "none" }} className="changefont">Checkout </Link>
    </li>
    </> : <></>

  const logincomponent = encryptStorage.getItem('user') != undefined ? <></>:<><li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px"}} className="changefont">
  <Link to="/login" style={{   textDecoration: "none" }} className="changefont">Login</Link>
</li><li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
          <Link to="/register" style={{   textDecoration: "none" }}className="changefont">Register</Link>
        </li></>

  return (
    <nav style={{ borderBottom: "2px solid black", backgroundColor: "grey" }} >
      <ul style={{ paddingTop: "7px", display: "flex", paddingRight: "20px" }}>

        <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none"}}>
          <Link to="/" style={{   textDecoration: "none", }} className="changefont"><Image src="../Images/pizzalogo.jpg" alt="pizzalogo" style={{width:"60px",height:"60px"}} /></Link>
        </li>
        {dashboardcomponent}
        {logincomponent}
        
        <li style={{ marginLeft: "7px", marginRight: "7px", listStyleType: "none",marginTop:"20px" }}>
          <Link to="/about" style={{   textDecoration: "none" }} className="changefont"> About</Link>
        </li>

        <div style={{ marginLeft: 'auto', color: "white" }}>
          <Clockcomponent />
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
