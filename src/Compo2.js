import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Toolbar } from '@material-ui/core'

export default function Compo2() {
    const paperStyle = { padding: 20, height: '12vh', width: 700, margin: "100px auto" }
    const paperStyle1 = { padding: 20, height: '50vh', width: 700, margin: "10px auto" }
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
    const token = Cookies.get('token')
    async function getData() {
        const allData = await axios.get(`http://localhost:9000/university/countstudent`,{ headers: {"Authorization" : `Bearer ${token}`}})
        // console.log(allData.data)
        setList(allData.data)
        console.log(allData.data)
    }

    return (
        <div>

            <Paper elevation={10} style={paperStyle1}>

                <Grid align = "center">
                    <Button onClick={() => {getData(); }} style={buttonStyle} variant='contained' color='secondary'>University With Student Count</Button>
                </Grid>
                <div>
                    <table data-testid="table" className="table table-dark">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">No. of Student</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e) => (
                                <tr key={e._id}>
                                    <th scope="col">{e._id}</th>
                                    <th scope="col">{e.name}</th>
                                    <th scope="col">{e.location}</th>
                                    <th scope="col">{e.studentCnt}</th>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                </div>

            </Paper>

        </div>
    )
}
