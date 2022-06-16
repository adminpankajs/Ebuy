import React from "react"
import { Link } from "react-router-dom"

export default function RegisterDashboard(params) {
    return (
        <div>
        <h1 className="center-text"><i>Register</i></h1> 
        <div className="feature-grid">
                <div className="grid-item">
                    <Link to= "/register/studentRegister" className="mylink"><b>Register As Student</b></Link>
                </div>
                <div className="grid-item">
                    <Link to= "/register/staffRegister" className="mylink"><b>Register As Staff</b></Link>
                </div>
                
            </div>
        </div>
    )
    
}