import React, { useState } from "react";

export default function UpdateCourse() {

    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits] = useState('');
    const [courseMaxMarks, setCourseMaxMarks] = useState('');
    const [status, setStatus] = useState('Waiting...')

    // Handles the course updation form.
    const handleSubmit = async(event) => {
        event.preventDefault();
        var myparams = {
            name: courseName,
            credits: courseCredits,
            maxMarks: courseMaxMarks
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };

        fetch('http://localhost:5000/course/update',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setStatus('Updated')
                setCourseName('')
                setCourseCredits('')
                setCourseMaxMarks('')
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    
    return (
        <div style={{textAlign: "center"}}>
            <h1><u>Update Course :</u></h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name:</p>
                    <input type={"text"} value={courseName} placeholder="MCA"
                        onChange={(e) => setCourseName(e.target.value)}
                    >
                    </input>
                </label>
                <br/>
                <label>
                    <p>Credits:</p>
                    <input type={"text"} value={courseCredits} placeholder="0-20"
                        onChange={(e) => setCourseCredits(e.target.value)}
                    >
                    </input>
                </label>
                <br/>
                <label>
                    <p>MaxMarks:</p>
                    <input type={"text"} value={courseMaxMarks} placeholder="100"
                        onChange={(e) => setCourseMaxMarks(e.target.value)}
                    >
                    </input>
                </label>
                <br/>
                <br/>
                <button type="submit">Update Course</button>
            </form>
            <br/>
            Status : { status }
        </div>
    )
}