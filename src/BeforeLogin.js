import React from 'react'
import { Button } from '@material-ui/core'
import { NavLink } from "react-router-dom";

export default function BeforeLogin() {
    return (
        <div>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/">Login </NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/signup">Signup </NavLink></Button>
        </div>
    )
}
