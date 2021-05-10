import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
export default function LoginPage() {
    const his = useHistory()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const paperStyle = { padding: 20, height: '50vh', width: 380, margin: "100px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const buttonStyle = {margin:'20px 0'}


    
    
    const validateName = function (name) {
        if (name === null || name === "") {
            return false
        }
        else {
            const re = /^([a-zA-Z\s]+)$/;
            return re.test(String(name).toLowerCase());
        }

    }


    async function postData() {

        if (fname === '' || lname === '') {
            alert('fields can not be blank');
        }
        else {
            if (!validateName(fname) || !validateName(lname)) {
                alert('information is not in correct format')
            }
            else {
                try {
                    await fetch('http://localhost:9000/user/create', {
                        method: 'post',
                        headers: {
                            'Accept': 'text/plain; charset=UTF-8',
                            'Content-type': 'text/plain; charset=UTF-8'
                        },
                        body: JSON.stringify({"id": parseInt(username), "firstName": `${fname}`, "lastName": `${lname}`,"password":`${pass}`})

                    }).then((res)=>{
                        
                            his.push('./')
                        
                    });
                //     alert('successful')
                // his.push('./')

                }
                catch (e) {
                    console.log(e);
                }
            }


        }
     
    }


    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AddBoxOutlinedIcon /></Avatar>
                    <h2>Sign up</h2>
                </Grid>
                <TextField label='First Name' placeholder='Enter first name' fullWidth required value = {fname} onChange={(e)=>setFname(e.target.value)}/>
                <TextField label='Last Name' placeholder='Enter last name' fullWidth required value = {lname} onChange={(e)=>setLname(e.target.value)}/>
                <TextField label='Username' placeholder='Enter username' fullWidth required value = {username} onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label='Password' type='password' placeholder='Enter password' fullWidth required value = {pass} onChange={(e)=>setPass(e.target.value)}/>
                
                <Button type='submit' color='primary' onClick = {postData} style= {buttonStyle} variant='contained' fullWidth >Sign Up</Button>
                
            </Paper>

        </Grid>
    )
}
