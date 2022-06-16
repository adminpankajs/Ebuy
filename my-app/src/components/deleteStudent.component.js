import React, { useState } from "react";

export default function DeleteStudent() {

    const [studentEmail, setStudentEmail] = useState('');
    const [status, setStatus] = useState('Waiting...')

    // Handles to delete a student with specified email
    const handleSubmit = async(event) => {
        event.preventDefault();
        var myparams = {
            email: studentEmail
        }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };

        fetch('http://localhost:5000/student/delete',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setStatus('Deleted')
                setStudentEmail('')
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    
    return (
        <div style={{textAlign: "center"}}>
            <h1><u>Delete Student :</u></h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email:</p>
                    <input type={"text"} value={studentEmail} placeholder="student@mern.com"
                        onChange={(e) => setStudentEmail(e.target.value)}
                    >
                    </input>
                </label>
                <br/>
                <br/>
                <button type="submit">Delete Student</button>
            </form>
            <br/>
            Status : { status }
        </div>
    )
}