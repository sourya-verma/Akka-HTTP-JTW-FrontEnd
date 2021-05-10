import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import AuthApi from './AuthApi'
import AddUniversityForm from './AddUniversityForm';
import { Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
const University = () => {
  const his = useHistory()

  const Auth = useContext(AuthApi)
  const [id, setId] = useState(0);
  const [universityName, setUniversityName] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = Cookies.get('token')
  if (!token) {
    

    his.push('./');
    // <Redirect to = './' />
  }

  useEffect(() => {
    getData();
  }, [])

  const addNewRecord = () => {
    getData();
  }

  async function getData() {
    const token = Cookies.get('token')
    const allData = await axios.get(`http://localhost:9000/university/list`,{ headers: {"Authorization" : `Bearer ${token}`}})
    console.log(allData.data)
    setUniversity(allData.data);
  }

  const editUniversityRecord = (e) => {
    console.log(e)
    setId(e.id);
    setUniversityName(e.name);
    setLocation(e.location);
  }
  const validateUniversity = function (name) {
    if (name === null || name === "") {

      return false
    }
    else {
      const re = /^([a-zA-Z\s]+)$/;
      return re.test(String(name));
    }

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


  async function deleteData(e) {
    if (window.confirm(`are you sure? Do you want to delete?\nID\t\t\t:\t\t${e.id}\nUniversity Name\t\t:\t\t${e.name}\nLocation\t\t:\t\t${e.location}\n`)) {
      const t = parseInt(e.id);
      console.log(t);
      try {
       await axios.delete(`http://localhost:9000/university/delete?id=${t}`,{ headers: {"Authorization" : `Bearer ${token}`} });

      }
      catch (e) {
        console.log(e);
      }
    }
    // handleClose();
    addNewRecord();
  }


  async function editData() {
    if (!validateName(universityName)) {
      alert('information is not in correct format')
    }
    else {
      try {
        var re = JSON.stringify({ "id": parseInt(id), "name": `${universityName}`, "location": `${location}` })
        await axios.put(`http://localhost:9000/university/update`,re,{ headers: {"Authorization" : `Bearer ${token}`} });
       

      }
      catch (e) {
        console.log(e);
      }
    }

    handleClose();
    addNewRecord();
  }

  return (
    <>
      <div style = {{ margin: "100px auto" }}>
        <table data-testid="table" className="table table-dark">
          <thead className="thead-light">
            <tr>
              <th scope="col">University ID</th>
              <th scope="col">University Name</th>
              <th scope="col">University Location</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              university.map((e) => (
                <tr key={e.id} onContextMenu={(el) => {
                  console.log(e.id)
                }}>
                  <th scope="col">{e.id}</th>
                  <th scope="col">{e.name}</th>
                  <th scope="col">{e.location}</th>
                  <th scope='col'> <button tilte="edit-addNew-btn" onClick={() => {
                    editUniversityRecord(e);
                  }} className="btn edit btn-outline-primary" data-toggle="modal" data-target="#mmyModal"><i className="fa fa-edit" style={{ fontSize: "20px" }}></i></button></th>
                  <th scope='col'> <button data-testid="delete-btn" title="delete-btn" onClick={() => {
                    deleteData(e);
                  }} className="btn delete btn-outline-danger"><i className="fa fa-trash-o" style={{ fontSize: "20px" }}></i></button></th>
                </tr>
              ))

            }
          </tbody>
        </table>

        <div className="container text-center">
          <button onClick={() => {
            handleShow();
          }} type="button" title="add_new" className="btn btn-outline-primary" data-toggle="modal" data-target="#myModal">
            Add New University <i className="fa fa-plus-circle" style={{ fontSize: "19px" }}></i>
          </button>
          {show === true && <AddUniversityForm hideMethod={handleClose} dataVal={addNewRecord} />}


        </div>


      </div>

      <div style = {{ margin: "100px auto" }} className="modal" id="mmyModal" title="mmyModal">
        <div className="modal-dialog modal-content modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h4 className="modal-title">Edit University </h4>
              <button type="button" className="close" data-dismiss="modal"
              >&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" value={universityName} onChange={(e) => setUniversityName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Location:</label>
                <input type="email" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div style={{ float: 'left' }} className="modal-footer">
                <button onClick={() => {
                  editData();
                }} type="button" className="btn btn-outline-primary" data-dismiss="modal" title="edit-btn">submit</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" title="close-btn">Close</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default University;
