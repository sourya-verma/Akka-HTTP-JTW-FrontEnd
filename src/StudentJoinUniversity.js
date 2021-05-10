import React, { useState } from 'react'
import axios from 'axios'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Toolbar } from '@material-ui/core'
import Compo1 from './Compo1'
import Cookies from 'js-cookie'
import Compo2 from './Compo2'
import { useHistory } from 'react-router'
export default function StudentJoinUniversity() {
    const token = Cookies.get('token')
    const his = useHistory()
    if (!token) {
    

        his.push('./');
      }

    return (
        <>
            <div style={{ margin: "0px auto" }}>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Toolbar style={{ margin: "10px" }}>
                        <div style={{ margin: "20px" }}>
                            <Compo1 />
                        </div>
                        <div style={{ margin: "20px" }}>
                            <Compo2 />
                        </div>
                    </Toolbar>
                </Grid>
            </div>
        </>

    )
}
