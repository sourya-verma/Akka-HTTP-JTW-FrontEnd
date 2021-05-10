import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AuthApi from '../AuthApi'
 const  LoginPage = (props) =>{
    const paperStyle = { padding: 20, height: '60vh', width: 380, margin: "100px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const buttonStyle = {margin:'8px 0'}

    const token  = Cookies.get("token")
    const Auth = useContext(AuthApi)
    const his = useHistory()
    const [userCredID, setuserID] = useState("")
    const [userCredPass, setuserPass] = useState("")
    useEffect(() => {
        if(token)
        {
            console.log('11111')
            his.push('./student')
        }
        else{
            console.log('222222')
        }
        
    }, [])
    const login = ()=>{
        axios.post("http://localhost:9000/user/validate",{
            id : parseInt(userCredID),
            password:userCredPass

        }).then((res)=>{
            if(res.data == null)
            {
                alert('login failed')
                his.push('./')
            }
            else{
                console.log(res.data)
                Cookies.set("token", res.data, { expires: 7 })
                Auth.setAuth(true)
                his.push('./student')
            }
        })
        
        
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required value = {userCredID} onChange={(e)=>setuserID(e.target.value)} />
                <TextField label='Password' type='password' placeholder='Enter password' fullWidth required value = {userCredPass} onChange={(e)=>setuserPass(e.target.value)}/>
                <FormControlLabel
                    control={
                        <Checkbox

                            name="checkedF"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' onClick = {login} style= {buttonStyle} variant='contained' fullWidth>Sign In</Button>
                <Typography>
                    <Link href="#" >
                        Forgot Password
                    </Link>
                </Typography>
                <Typography> Do you have an account ?
                    <Link href="#" >
                        Sign up
                    </Link>
                </Typography>
            </Paper>

        </Grid>
    )
}
export default LoginPage