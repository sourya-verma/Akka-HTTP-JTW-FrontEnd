import React, { useContext, useEffect } from 'react'
// import Student from './Student'
// import University from './University'
import { NavLink } from "react-router-dom";
import { Container, Typography, AppBar, Toolbar, Button } from '@material-ui/core'
import './index.css'
import AuthApi from './AuthApi'
import AfterLogin from './AfterLogin'
import BeforeLogin from './BeforeLogin';
export default function Main(props) {
    const Auth = useContext(AuthApi)
    useEffect(() => {
        
    }, [])
    return (

        <Container >
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Home</Typography>
                    {Auth.auth ? <AfterLogin/>: <BeforeLogin/>}
                </Toolbar>
            </AppBar>
        </Container>




    )
}
