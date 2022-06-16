import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import Page401 from "./page401.component.js";

// import of authentication service for verification of user.
const AuthService = require('../services/AuthService.js')

export default function StaffDashboard(params) {
    
    const [authenicated, setAuthenticated] = useState(false);
    const [cookies] = useCookies();

    // Handles checks for authentication.
    useEffect(() => {
        const token = cookies.accessToken;
        if(token !== undefined) {
            if(cookies.role==='staff') {
                (AuthService.AuthTokenStaff(cookies.accessToken))
                    .then((res) => {
                        if(res!=="TokenFailed") {
                            setAuthenticated(true);
                        }
                        else {
                            setAuthenticated(false);
                        }
                    })
            }
        }
    },[cookies])
    
    return (
        <section>
            { (authenicated) ? (
                <section>
                    <div className="center-text black-bg margin-10px">
                        <p style={{fontSize: "3vw"}}><u>Staff Dashboard</u></p>
                    </div>
                    <div style={{fontSize: "4vw", marginBottom: "5px"}} className="center-text">Features</div> 
                        <div className="feature-grid">
                            <div className="grid-item">
                                <Link to= "/student" className="mylink"><b>View All Students</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/search" className="mylink"><b>Search Student Details</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/register/studentRegister" className="mylink"><b>Add New Student</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/updateStudent" className="mylink"><b>Update Student Data</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/deleteStudent" className="mylink"><b>Delete Student</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/viewCourse" className="mylink"><b>View All Courses</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/addCourse" className="mylink"><b>Add New Course</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/updateCourse" className="mylink"><b>Update Course</b></Link>
                            </div>
                            <div className="grid-item">
                                <Link to= "/staff/deleteCourse" className="mylink"><b>Delete Course</b></Link>
                            </div>
                            
                        </div>
                </section>
            )
            : (
                <Page401/>
            )}
        </section>
    )
    
}