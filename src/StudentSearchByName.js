
import React, { useContext, useState, } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router'
export default function StudentSearchByName() {
    const paperStyle = { padding: 20, height: '12vh', width: 1080, margin: "100px auto" }
    const paperStyle1 = { padding: 20, height: '50vh', width: 1080, margin: "10px auto" }
    const styles = {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    }
    const buttonStyle = { margin: '8px 0' }
    const [name, setName] = useState("")
    const [list, setList] = useState([])
    const his = useHistory()
    const token = Cookies.get('token')
    if (!token) {
    

        his.push('./');
        // <Redirect to = './' />
      }

    async function getData(name) {
        const allData = await axios.get(`http://localhost:9000/student/searchbyname/${name}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        // console.log(allData.data)
        setList(allData.data)     
        console.log(allData.data)   
      }


    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Toolbar>
                        <Button onClick={() => {getData(name); }} style={buttonStyle} variant='contained' color='secondary'>Search</Button>
                        <TextField value = {name} onChange = {(e)=>setName(e.target.value)} style={styles} id="standard-basic" label="Standard" />
                    </Toolbar>
                </Paper>
            </Grid>
            <Paper elevation={10} style={paperStyle1}>
                <div>
                    <table data-testid="table" className="table table-dark">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">University ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            { list.map((e) => (
                                <tr key={e._id}>
                                    <th scope="col">{e._id}</th>
                                    <th scope="col">{e.name}</th>
                                    <th scope="col">{e.email}</th>
                                    <th scope="col">{e.universityId}</th>
                                </tr>      
                            ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    )
}
