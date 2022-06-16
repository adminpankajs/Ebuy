import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import '../components/studentLogin.component.css'

// import the auth-service for authentication purpose.
const AuthService = require('../services/AuthService.js')

export default function StudentLogin() {
    const userRef = useRef();

    const [cookies, setCookie ] = useCookies();
    const [status, setStatus] = useState('')

    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [authenticated,setAuthenticated] = useState(false);

    useEffect(() => {
        if(email !=='')
        setStatus('')
    },[email])

    useEffect(() => {
        const token = cookies.accessToken;
        if(token !== undefined) {
            (AuthService.AuthTokenStudent(cookies.accessToken))
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

    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: pwd})
        };

        fetch('http://localhost:5000/login/student/generateToken',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setCookie('accessToken',res[0].accessToken,{path: '/'});
                setCookie('role','student',{path: '/'});
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


    return (
        <div>
            {authenticated ? (
                <section>
                    <h1>You are logged in !!</h1>
                </section>
            ) : (
                <section>
                    <div  className="student_login_form">
                        <h1 style={{textAlign: "center"}}>Student Login</h1>
                        <form style={{textAlign: "center", padding: "30px"}} onSubmit={handleSubmit}>
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
                            <button style={{border: "none", fontSize: "2vw", padding: "0vw 2vw",backgroundColor: "#f10f75", color: "white", borderRadius: "5px", paddingBlock: "0.5vw"}} type="submit">Sign In</button>
                        </form>
                    </div>
                </section>

            )}

        </div>
    )
}