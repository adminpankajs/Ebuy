import React, { useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import Page401 from "./page401.component.js";

const AuthService = require('../services/AuthService.js')

export default function StudentGetOne(props) {
    const [myStudentData, setMyStudentData] = useState([]);
    const [authenicated, setAuthenticated] = useState(false);
    const [cookies] = useCookies();
    const [courseData, setCourseData] = useState([]);
    var semail = "";

    // Handles the authentication of current user.
    useEffect(() => {
        const token = cookies.accessToken;
        if(token !== undefined) {
            if(cookies.role==="student") {
                (AuthService.AuthTokenStaff(cookies.accessToken))
                    .then((res) => {
                        if(res!=="TokenFailed") {
                            setAuthenticated(true);
                            getStudent()
                        }
                        else {
                            setAuthenticated(false);
                        }
                    })
            }
        }
    })
    
    // Fetch data of a specific user from database.
    function getStudent() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({accessToken : cookies.accessToken})
        };

        fetch('http://localhost:5000/student/getOne',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setMyStudentData(res)
                semail = res[0].email;
            })
            .then(() => {
                var myparams = {queries : {email: semail}, sorting: {name : 1}};
                requestOptions.body = JSON.stringify(myparams)
                fetch('http://localhost:5000/score/getAllWithStudentData',requestOptions)
                    .then(res => res = res.json())
                    .then(res => {
                        setCourseData(res)
                    })
                    .catch((err) => {
                        console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
        })

        

        return;
    }

    return (
        <div>
            {(authenicated) ? (
                <section>
                    <h1 style={{textAlign: "center"}}><u>Personal Details :</u></h1>
                    {myStudentData.map((studentdetails) => (
                        <div>
                            <h3>Enroll No : { studentdetails.enrollNo }</h3>
                            <h3>Name : { studentdetails.name }</h3>
                            <h3>Gender : { studentdetails.gender }</h3>
                            <h3>Email : { studentdetails.email }</h3>
                            <h3>Date of Birth : { studentdetails.dateOfBirth }</h3>
                            <h3>Address : { studentdetails.address }</h3>
                            <h3>Mobile No : { studentdetails.mobileNo }</h3>
                        </div>
                    
                    ))}
                    <h1 style={{textAlign:"center"}}><u>Course Details : </u></h1>

                    <table style={{textAlign: "center",margin: "auto"}} cellSpacing={33} className="table">
                        <thead className="thead">
                            <tr>
                                <th>Subject</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {courseData.map((studentdetails) => (
                            <tr>
                                <td>{studentdetails.subject}</td>
                                <td>{studentdetails.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/>
                </section>
            )
            : (
                <Page401/>
            )}
            </div>
    )
}