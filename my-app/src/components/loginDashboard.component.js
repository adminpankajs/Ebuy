import React, { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UserContext from '../services/ContextService';

import './loginDashboard.css';
var constants = require('../constants/constants');
const AuthService = require('../services/AuthService.js')

export default function LoginDashboard(params) {
    // const userRef = useRef();
    const [userName ,setUserName ] = useContext(UserContext);
    const [cookies, setCookie, removeCookie ] = useCookies();
    const [status, setStatus] = useState('')
    const [signupLink, setSignupLink] = useState('/register/customerRegister')

    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [authenticated,setAuthenticated] = useState(false);
    const [roleType, setRoleType] = useState('customer');
    const navigate = useNavigate();

    
    // Handles the checks for user authentication.
    useEffect(() => {
        document.getElementById('roleTypeCustomer').style.backgroundColor = '#f34653';
        document.getElementById('roleTypeCustomer').style.color = 'white';
        console.log(userName);
        const token = cookies.accessToken;
        if(token !== undefined) {
            (AuthService.AuthToken(cookies.accessToken,cookies.role))
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
    
    useEffect(() => {
        document.getElementById(roleType)
    },[roleType])

    // Handles the user login form submission.
    const handleSubmit = async() => {
        console.log('Form working');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: pwd})
        };

        fetch(`http://localhost:5000/login/${roleType}/generateToken`,requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setCookie('accessToken',res[0].accessToken,{path: '/'});
                setCookie('role',roleType,{path: '/'});
                setAuthenticated(true);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
        setStatus("Something went wrong.")
        setEmail('');
        setPwd('');
    } 

    // Handles the logout of the current logged-in user.
    const handleLogout = async() => {
        removeCookie("accessToken",{path:'/'});
        setAuthenticated(false);
        navigate('/');
    }

    const role = (val,e) => {
        let obj = document.getElementsByClassName(e.target.className);
        for(let i=0;i<obj.length;i++) {
            obj[i].style.backgroundColor = 'whitesmoke';
            obj[i].style.color = 'black';
        }
        document.getElementById(e.target.id).style.backgroundColor = '#f34653';
        document.getElementById(e.target.id).style.color = 'white';
        
        let myObj = document.getElementsByClassName('loginDashboard-main-form');
        // myObj[0].className = myObj[0].className+" my-animate";
        window.setTimeout(() => {
            myObj[0].classList.add("my-animate");
          }, 0);
        myObj[0].classList.remove("my-animate");
        if(val=='customer') {
            setSignupLink('/register/customerRegister');
        }
        else if(val=='seller') {
            setSignupLink('/register/sellerRegister');
        }
        setRoleType(val);
    }

    return (
        
        <>
            {authenticated ? (
                <section style={{display: "flex", margin:"auto", justifyContent:"center", flexDirection:"column"}}>
                    <h1>You are logged in !!</h1>
                    <form onSubmit={handleLogout}>
                        <button className="button submitButton  gsc_col-xs-12 gsc_col-md-12 " type="submit">Logout</button>
                    </form>
                </section>

            ) : (
                <div className="loginDashboard-main">
                    <div className="loginDashboard-main-img">
                        <b>Hello, Welcome to E-Buy</b>
                        <br></br>
                    </div>
                    <div className="loginDashboard-main-form">
                        <img className="loginImg" src={`${constants.websiteImages}/login-icon.png`}></img>
                        <b>Account Login</b>
                        <br/>
                        <div className="loginDashboard-form-roleType">
                            <button onClick={(e) => role('customer',e)} id="roleTypeCustomer" className="loginDashboard-form-roleType-button">Customer</button>
                            <button onClick={(e) => role('seller',e)} id="roleTypeSeller" className="loginDashboard-form-roleType-button">Seller</button>
                        </div>
                        <br/>
                        <input value={email} onChange={(e) => {setEmail(e.target.value); setStatus('')}} type={"text"} placeholder={"username"}/>
                        <br/>
                        <input value={pwd} onChange={(e) => {setPwd(e.target.value); setStatus('')}} type={"password"} placeholder={"password"}/>
                        <h3 style={{color: "red"}}>{status}</h3>
                        <button onClick={handleSubmit} style={{float: "right"}} type="button" name="submitBtn" className="button submitButton  gsc_col-xs-12 gsc_col-md-12 "><div style={{fontWeight:"900"}}>Sign In</div></button>
                        <Link style={{fontSize: "1vw", textDecoration: "underline", color: "blue"}} to={signupLink}>Not having an account ?</Link>
                    </div>
                </div>

            )}
        </>
    )
    
}