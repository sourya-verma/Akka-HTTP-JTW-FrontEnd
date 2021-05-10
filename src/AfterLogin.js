import React,{useContext} from 'react'
import { Button } from '@material-ui/core'
import { NavLink, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import AuthApi from './AuthApi'
export default function AfterLogin() {
    
    const his = useHistory()
    const Auth = useContext(AuthApi)

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const userFirstName= parseJwt(Cookies.get("token")).id
    const handleLogout = () => {
        Cookies.remove("token")
        console.log("clicked")
        Auth.setAuth(false)
        his.push("./")

    }
    return (
        <div>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/student">Student </NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/university">University</NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/studentjoinuniversity">Student_Join_University</NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="#">{userFirstName}</NavLink></Button>
            <Button onClick ={()=>handleLogout()} color='inherit'><NavLink className="inactive" activeClassName="active" exact to="#">Logout</NavLink></Button>
        </div>
    )
}
