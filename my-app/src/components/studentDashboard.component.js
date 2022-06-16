import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
    return (
        <div>
            <div className="center-text black-bg margin-10px">
                <h1><u>Student Dashboard</u></h1>
            </div>
            <h2>Notice :</h2>
            <h3>
                The exams for this semester has been postponed
                till furthur notice.
            </h3>
            <h1 className="center-text">
                Features
            </h1>
            <div className="feature-grid">
                <div className="grid-item">
                    <Link to= "/student/getOneById" className="mylink"><b>View Student Details</b></Link>
                </div>
            </div>
        </div>
    )
}