import React from 'react'
import { useState, useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
import {Card,Button} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
function Dashboard() {
    const [user, setuser] = useState("")
    const userdata=encryptStorage.getItem('user')[0]
    console.log(userdata)
    async function fetchdata(){
        await setuser(encryptStorage.getItem('user'))
    }
    useEffect(() => {
        fetchdata()
        const data=jwt_decode(localStorage.getItem('_token'))
        //alert(user)
        setuser(data.UID)
        //console.log(encryptStorage.getItem('user'))
    }, [])
    return (
        
        <html><head>
            <script src='../Chart/echart.js'></script>
            </head><body>
        <div style={{ backgroundImage:"url('../Images/dashboardbackground.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",height:"560px",paddingLeft:"70px",paddingRight:"70px",paddingTop:"50px"}}>
        <div style={{border:"2px solid black",width:"43%",marginLeft:"30%",padding:"30px"}}>
            <h1 className="changefont"><center>Welcome</center></h1>
            <h1 className="changefont">Username:<span style={{marginLeft:"20px"}}></span>{userdata.username}</h1>
            <h1 className="changefont">Email:<span style={{marginLeft:"20px"}}></span>{userdata.email}</h1>
            <h1 className="changefont">Age:<span style={{marginLeft:"20px"}}></span>{userdata.age}</h1>
            <h1 className="changefont">Mobile:<span style={{marginLeft:"20px"}}></span>{userdata.mobile}</h1>
        </div>
        </div>
        </body></html>
    )
}

export default Dashboard
