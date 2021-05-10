import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import './index.css'
import AuthApi from './AuthApi'
const App = () => {
    const [auth,setAuth]= useState(false);
    const readCookie = ()=>{
        const user = Cookies.get("token")
        if(user){
            setAuth(true);
        }
    }
    useEffect(()=>{
        readCookie();
    },[])
    
    return (
        <>
            <AuthApi.Provider value={{auth,setAuth }}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </AuthApi.Provider>
        </>
    )
}
export default App;