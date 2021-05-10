import React, { useState } from 'react'
import Error from './Error'
import { Route, Switch } from "react-router-dom";
import Student from './Student';
import University from './University';
import Main from './Main';
import './index.css'
import StudentSearchByName from './StudentSearchByName';
import UniversitySearchByName from './UniversitySearchByName';
import StudentJoinUniversity from './StudentJoinUniversity'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
const App = () => {

    const [view, setView] = useState(false)
    const [userName, setName] = useState("")
    const handleLogin = () => setView(true)
    const handleLogout = () => setView(false)
    const changeName = (a) => setName(a)
    

    return (
        <>
            <Main/>
            
            <Switch>
                <Route exact path="/" component={() => <LoginPage/>} />
                <Route exact path="/signup" component={() => <SignupPage/>} />
                <Route exact path="/student" component={() => <Student/>} />
                <Route exact path="/university/" component={() => <University/>} />
                <Route exact path="/studentsearchby" component={() => <StudentSearchByName/>} />
                <Route exact path="/universitysearchby" component={() => <UniversitySearchByName/>} />
                <Route exact path="/studentjoinuniversity" component={() => <StudentJoinUniversity/>} />
                <Route component={Error} />
            </Switch>

        </>

    )
}
export default App;