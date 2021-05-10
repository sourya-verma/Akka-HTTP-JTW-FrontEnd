import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios'
import AuthApi from './AuthApi'
import "bootstrap/dist/css/bootstrap.css";
import AddStudentForm from './AddStudentForm';
import { Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
const Student = () => {
  const his = useHistory()

  const Auth = useContext(AuthApi)

  const token = Cookies.get('token')
  // const token = Cookies.get('token')
  const [id, setId] = useState(0);
  const [con, setCon] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [uid, setUniversityId] = useState(0);
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  if (Auth.auth === false) {
    

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
    const allData = await axios.get(`http://localhost:9000/student/list`,{ headers: {"Authorization" : `Bearer ${token}`} })
    console.log(allData.data)
    setUser(allData.data);
  }

  const formatDate = (a) => {
    const date = new Date(a);
    // const changedDate =  + "/" +  + 
    const changedDate  = date.getFullYear() +"-" + (date.getMonth() + 1) +"-" + date.getDate()
    // console.log(a)
    return changedDate

  }


  const editRecord = (e) => {
    // console.log(e)
    setId(e.id);
    setName(e.name);
    setEmail(e.email);
    setUniversityId(e.universityId);
    // console.log(e.dob)
    setDob(formatDate(e.dob));
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
    if (window.confirm(`are you sure? Do you want to delete?\nID\t\t\t:\t\t${e.id}\nName\t\t:\t\t${e.name}\nEmail\t\t:\t\t${e.email}\nUniversity\t:\t\t${e.universityId}`)) {
      const t = parseInt(e.id);
      // console.log(t);
      try {
        await axios.delete(`http://localhost:9000/student/delete?id=${t}`,{ headers: {"Authorization" : `Bearer ${token}`} });

      }
      catch (e) {
        // console.log(e);
      }
    }
    // handleClose();
    addNewRecord();
  }

  async function editData() {
    if (!validateName(name) || !validateEmail(email)) {
      alert('information is not in correct format')
    }
    else {
      try {
        var re = JSON.stringify({ "name": `${name}`, "email": `${email}`, "universityId": parseInt(uid), "id": parseInt(id) })
        await axios.put(`http://localhost:9000/student/update`,re,{ headers: {"Authorization" : `Bearer ${token}`} });

      }
      catch (e) {
        // console.log(e);
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
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">University ID</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((e) => (
                <tr key={e.id}>
                  <th scope="col">{e.id}</th>
                
                  <th scope="col">{e.name}</th>
                  <th scope="col">{e.email}</th>
                  <th scope="col">{e.universityId}</th>
                  <th scope='col'> <button tilte="edit-addNew-btn" onClick={() => {
                    editRecord(e);
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
            Add New Student <i className="fa fa-plus-circle" style={{ fontSize: "19px" }}></i>
          </button>
          {show === true && <AddStudentForm hideMethod={handleClose} dataVal={addNewRecord} />}


        </div>


      </div>



      <div style = {{ margin: "100px auto" }} className="modal" id="mmyModal" title="mmyModal">
        <div className="modal-dialog modal-content modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h4 className="modal-title">Edit Student </h4>
              <button type="button" className="close" data-dismiss="modal"
              >&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="uid">University ID:</label>
                <input type="text" className="form-control" id="uid" placeholder="Enter University ID" value={uid} onChange={(e) => setUniversityId(e.target.value)} />
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

      {/* <div className="modal">
        <div id="context-menu">
          <a>
            <div className="item">
              <i className="fa fa-edit"></i> Edit
			</div>
          </a>
          <a>
            <div className="item">
              <i className="fa fa-trash-o"></i> Delete
			</div>
          </a>

        </div>
      </div> */}
    </>
  )
}

export default Student;
