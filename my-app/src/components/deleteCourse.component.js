import React, { useState } from "react";

export default function DeleteCourse() {

    const [courseName, setCourseName] = useState('');
    const [status, setStatus] = useState('Waiting...')

    // Handles the form submission for the deletion for a specific course if exists.
    const handleSubmit = async(event) => {
        event.preventDefault();
        var myparams = {
            name: courseName
        }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };

        fetch('http://localhost:5000/course/delete',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setStatus('Deleted')
                setCourseName('')
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    
    return (
        <div style={{textAlign: "center"}}>
            <h1><u>Delete Course :</u></h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name:</p>
                    <input type={"text"} value={courseName} placeholder="MCA"
                        onChange={(e) => setCourseName(e.target.value)}
                    >
                    </input>
                </label>
                <br/>
                <br/>
                <button type="submit">Delete Course</button>
            </form>
            <br/>
            Status : { status }
        </div>
    )
}