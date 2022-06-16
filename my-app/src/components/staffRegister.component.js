import React, { useState } from "react";
import '../components/staffRegister.component.css'
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Gets secret-token for authentication purpose.
const secretToken = process.env.React_App_TOKEN_SECRET

export default function StaffRegister() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(Date);
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [status, setStatus] = useState('Waiting...');

    // Hanldes the registeration form of user.
    const handleSubmit = async(event) => {
        event.preventDefault();

        // Email format check
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)) {
            fetch('http://localhost:5000/seller/getOne',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({seller_email : email})
            })
                .then((data) => data = data.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setStatus('Email ID already exist !!')
                        setEmail('')
                    }
                    else {
    
                        const staff = {
                            email: email,
                            password: password,
                            name: name,
                            gender: gender,
                            dateOfBirth: dateOfBirth,
                            address: address,
                            mobileNo: mobileNo,
                            accessToken: "",
                        }
    
                        const accessToken = jwt.sign(
                            {"email": email},
                            secretToken,
                            { expiresIn: '1d' }
                        );
    
                        staff.accessToken = accessToken;
    
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(staff)
                        };
                        fetch('http://localhost:5000/seller/add', requestOptions)
                            .then((res) => setStatus('Registered !!'))
                            .catch((err) => console.log("ERROR"+err));
                    }
                })
        }
        else {
            setStatus('Email Format is not valid !')

        }
    } 


    return (
        <>
            <section>
                <h1 style={{textAlign: "center"}}>Seller Register</h1>
                <div className="register_form">
                    <form style={{textAlign: "center", padding: "30px"}} onSubmit={handleSubmit}>
                        <label className="register_form_label">
                            Email :
                            <input type={"text"} placeholder="Shivam@mern.com" value={email}
                                required onChange={(e) => setEmail(e.target.value)} 
                            />
                        </label><br/>
                        <label className="register_form_label">
                            Password:
                            <input type={"password"} placeholder="*****" value={password}
                                required onChange={(e) => setPassword(e.target.value)} 
                            />
                        </label><br/>
                        <label className="register_form_label">
                            Name :
                            <input type={"text"} placeholder="Shivam" value={name}
                                required onChange={(e) => setName(e.target.value)} 
                            />
                        </label><br/>
                        <label className="register_form_label">
                            Gender:
                            <select value={ gender }
                            onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="Male" selected>Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label><br/>
                        <label className="register_form_label">
                            Date of Birth :
                            <input type={"date"} value={dateOfBirth}
                                required onChange={(e) => setDateOfBirth(e.target.value)} 
                            />
                        </label><br/>
                        <label className="register_form_label">
                            Address :
                            <input type={"text"} placeholder="Delhi" value={address}
                                required onChange={(e) => setAddress(e.target.value)} 
                            />
                        </label><br/>
                        <label className="register_form_label">
                            Mobile No(+91) :
                            <input type={"text"} placeholder="9876543210" value={mobileNo}
                                required onChange={(e) => setMobileNo(e.target.value)} 
                            />
                        </label><br/>
                        <h3>Status : {status}</h3>
                        <button className="black-button" type="submit">Sign Up</button>
                    </form>
                </div>
                <br/>
            </section>
        </>
    )
}