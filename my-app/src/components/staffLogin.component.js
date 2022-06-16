import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// import of auth service for user authentication.
const AuthService = require('../services/AuthService.js')

export default function StaffLogin() {
    const userRef = useRef();
 
    const [cookies, setCookie, removeCookie ] = useCookies();
    const [status, setStatus] = useState('')

    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [authenticated,setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(email !=='')
        setStatus('')
    },[email])

    // Handles the checks for user authentication.
    useEffect(() => {
        const token = cookies.accessToken;
        if(token !== undefined) {
            (AuthService.AuthTokenStaff(cookies.accessToken))
                .then((res) => {
                    if(res!=="TokenFailed") {
                        setAuthenticated(true);
                        setStatus('')
                    }
                    else {
                        setAuthenticated(false);
                    }
                })
        }
    },[cookies])

    // Handles the user login form submission.
    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: pwd})
        };

        fetch('http://localhost:5000/login/staff/generateToken',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setCookie('accessToken',res[0].accessToken,{path: '/'});
                setCookie('role','staff',{path: '/'});
                setAuthenticated(true);
            })
            .catch((err) => {
                console.log(err);
            })
        if(authenticated===false) {
            setStatus("ERROR : Wrong Credentials !!")
        }
        setEmail('');
        setPwd('');
    } 

    // Handles the logout of the current logged-in user.
    const handleLogout = async(event) => {
        event.preventDefault();
        removeCookie("accessToken",{path:'/'});
        setAuthenticated(false);
        navigate('/');
    }

    return (
        <>
            {authenticated ? (
                <section>
                    <h1>You are logged in !!</h1>
                    <form onSubmit={handleLogout}>
                        <button type="submit">Logout</button>
                    </form>
                </section>
            ) : (
                <section>
                    <h1 style={{textAlign: "center"}}>Staff Login</h1>
                    <div className="student_login_form">
                        <form style={{textAlign: "center"}} onSubmit={handleSubmit}>
                            <label style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                Email :
                                <input type={"text"} placeholder="Shivam@mern.com" value={email}
                                    required ref={userRef} onChange={(e) => setEmail(e.target.value)} 
                                />
                            </label>
                            <br/>
                            <label  style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                Password:
                                <input type={"password"} placeholder="*****" value={pwd}
                                    required onChange={(e) => setPwd(e.target.value)} 
                                />
                            </label>
                            <br/>
                            <h3 style={{color: "red"}}>{status}</h3>
                            <button className="black-button" type="submit">Sign In</button>
                        </form>
                    </div>
                </section>

            )}
        </>
    )
}