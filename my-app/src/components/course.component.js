import React, {useEffect, useState} from 'react'

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    
    // Fetch all course from backend and store it for rendering.
    useEffect(() => {
        fetch('http://localhost:5000/course/getAll')
            .then(res => res.json())
            .then(res => {
                setCourses(res);
            })
            .catch((err) => {
                console.log("Error : "+err);
            })
    })
    return (
        <div style={{textAlign: "center"}}>
            <h1>Course List</h1>
            <table style={{margin: "auto"}} cellSpacing={33} className="table">
                <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Max Score</th>
                    </tr>
                </thead>
                <tbody>
                {courses.map((coursedetails) => (
                    <tr>
                        <td>{ coursedetails.name }</td>
                        <td>{ coursedetails.credits }</td>
                        <td>{ coursedetails.maxMarks }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}