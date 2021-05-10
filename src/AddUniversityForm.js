import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios'
import Cookies from 'js-cookie'
const AddForm = (props) => {
    
    const token = Cookies.get('token')
    const validateUniversity = function (name) {
        if (name === null || name === "") {

            return false
        }
        else {
            const re = /^([a-zA-Z\s]+)$/;
            return re.test(String(name));
        }

    }
    const formatDate = (a) => {
        const date = new Date(a);
        const changedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return changedDate

    }
    const validateEmail = function (email) {
        const re = /^([a-zA-Z\d+)(\.[a-zA-Z\d]+)?@([a-zA-Z\d]+).([a-zA-Z]{2,8})(\.[a-zA-Z\d]+)?$/;
        return re.test(String(email).toLowerCase());
    }
    const validateName = function (name) {
        if (name === null || name === "") {
            return false
        }
        else {
            const re = /^([a-zA-Z\s]+)$/;
            return re.test(String(name).toLowerCase());
        }

    }


    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [uid, setUniversityID] = useState(0);
    async function postData() {

        if (name === '') {
            alert('fields can not be blank');
        }
        else {
            if (!validateName(name)) {
                alert('information is not in correct format')
            }
            else {
                try {
                    var re = JSON.stringify({ "id": parseInt(uid), "name": `${name}`, "location": `${location}` })
                    await axios.post(`http://localhost:9000/university/create`,re,{ headers: {"Authorization" : `Bearer ${token}`} });
                   

                }
                catch (e) {
                    console.log(e);
                }
            }


        }
        props.hideMethod();
        props.dataVal();
    }
    useEffect(() => {
    })
    return (
        <div style = {{ margin: "100px auto" }} className="modal" id="myModal" title="myModal">
            <div className="modal-dialog modal-content modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-success">
                        <h4 className="modal-title">Add New University </h4>
                        <button tilte="close-addform-btn" type="button" className="close" data-dismiss="modal" onClick={() => {
                            props.hideMethod();
                        }}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            {/* <label htmlFor="email"></label> */}
                            <input type="email" className="form-control" id="id" placeholder="Enter University ID" value={uid} onChange={(e) => setUniversityID(e.target.value)} />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="name">Name:</label> */}
                            <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                        </div>

                        <div className="form-group">
                            {/* <label htmlFor="uid">University ID:</label> */}
                            <input type="text" className="form-control" id="location" placeholder="Enter University Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div style={{ float: 'left' }} className="modal-footer">
                            <button onClick={() => {
                                postData();
                            }} type="button" className="btn btn-outline-primary" data-dismiss="modal">submit</button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                props.hideMethod();
                            }} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};
export default AddForm;