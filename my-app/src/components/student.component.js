import React, { useEffect, useState } from "react";
import './student.component.css'

const Student = props => (
    <tr>
        <td>{props.student.enrollNo}</td>
        <td>{props.student.name}</td>
        <td>{props.student.email}</td>
        <td>{props.student.gender}</td>
        <td>{props.student.dateOfBirth}</td>
        <td>{props.student.address}</td>
        <td>{props.student.mobileNo}</td>
    </tr>
)

export default function StudentList(){
    
    const [students, setStudents] = useState([]);
    
    // Fetch all users from database.
    useEffect(() => {
        fetch('http://localhost:5000/student/getAll')
            .then(res => res.json())
            .then(res => {
                setStudents(res)
            })
            .catch((err) => {
                console.log(err);
            })

    })

    function studentList() {
        return students.map(currStudent => {
            return <Student student={currStudent}/>;
        })
    }

    return (
        <div className="student-all">
            <div>
                <h2>Student Details</h2>
            </div>
            <table cellSpacing={33} className="table">
                <thead className="thead">
                    <tr>
                        <th>EnrollNo.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Address</th>
                        <th>Mobile No</th>
                    </tr>
                </thead>
                <tbody>
                    { studentList() }
                </tbody>
            </table>
            <br/>
        </div>
    )
}