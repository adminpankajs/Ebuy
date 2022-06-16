import React, { useEffect, useState} from "react";

export default function UpdateStudent(props) {
    const [myStudentData, setMyStudentData] = useState([]);
    const [studentFormEnrollNo, setStudentFormEnrollNo] = useState('')
    const [studentFormName, setStudentFormName] = useState('')
    const [studentFormEmail, setStudentFormEmail] = useState('')
    const [studentFormAddress, setStudentFormAddress] = useState('')
    const [studentFormMobileNo, setStudentFormMobileNo] = useState('')
    const [courseData, setCourseData] = useState([]);
    const [studentEmail, setStudentEmail] = useState('')
    const [personalUpdateStatus, setPersonalUpdateStatus] = useState('Waiting..')
    const [courseUpdateStatus, setCourseUpdateStatus] = useState('Waiting..')
    const [courseAddStatus, setCourseAddStatus] = useState('Waiting..')
    const [gotDetails, setGotDetails] = useState(false);
    const [newCourse, setNewCourse] = useState('');
    const [newCourseMarks, setNewCourseMarks] = useState('');
    const [addCourse, setAddCourse] = useState('');
    const [addCourseMarks, setAddCourseMarks] = useState('');
    const [course, setCourse] = useState([]);
    var semail = "";
    
    const Courses = props => (
        <option value={props.course.name}>{props.course.name}</option>
    )

    // Fetch all courses from database.
    useEffect(() => {
        fetch('http://localhost:5000/course/getAll')
            .then(res => res.json())
            .then(res => {
                setCourse(res)
            })
            .catch((err) => {
                console.log(err);
            })
        
        
    },[])

    function courseList() {
        return course.map(currCourse => {
            return <Courses course={currCourse}/>;
        })
    }

    // Handles the form for fetch of student data.
    const handleSubmit = async(event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email : studentEmail})
        };

        fetch('http://localhost:5000/student/getOne',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setMyStudentData(res)
                semail = res[0].email;
                console.log("Email IS :: "+semail)
            })
            .then(() => {
                var myparams = {queries : {email: semail}, sorting: {name : 1}};
                requestOptions.body = JSON.stringify(myparams)
                fetch('http://localhost:5000/score/getAllWithStudentData',requestOptions)
                    .then(res => res = res.json())
                    .then(res => {
                        setCourseData(res)
                        setGotDetails(true)
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

    // Handles the form for updation of personal details of the user.
    const handleSubmitPersonal = async(event) => {
        event.preventDefault()
        var myparams  = {credentials: {}, data: {}}
        
        myparams.credentials.email = studentEmail;
        
        if(studentFormEnrollNo!=="") {
            myparams.data.enrollNo = studentFormEnrollNo
        }
        if(studentFormName!=="") {
            myparams.data.name = studentFormName
        }
        if(studentFormEmail!=="") {
            myparams.data.email = studentFormEmail
        }
        if(studentFormAddress!=="") {
            myparams.data.address = studentFormAddress
        }
        if(studentFormMobileNo!=="") {
            myparams.data.mobileNo = studentFormMobileNo
        }
        
        
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };
        
        fetch('http://localhost:5000/student/update',requestOptions)
        .then((student) => student = student.json())
        .then((student) => {
            setPersonalUpdateStatus('updated')
        })
        .catch((err) => console.log(err))
    }
    
    // Handles the form for updation of course details of the user.
    const handleCourseUpdateSubmit = async(event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email : studentEmail,
                subject: newCourse,
                score: newCourseMarks
            })
        };

        fetch('http://localhost:5000/score/update',requestOptions)
            .then((student) => student = student.json())
            .then((student) => {
                setCourseUpdateStatus('updated')
            })
            .catch((err) => console.log(err))
    }
    const handleCourseAddSubmit = async(event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email : studentEmail,
                subject: addCourse,
                score: addCourseMarks
            })
        };

        fetch('http://localhost:5000/score/add',requestOptions)
            .then((student) => student = student.json())
            .then((student) => {
                setCourseAddStatus('updated')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
                <section style={{textAlign: "center"}}>
                    <p style={{fontSize: "3vw"}}>Update Student Details</p>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter Email :
                            <input type={"text"} value={studentEmail}
                                placeholder="student@mern.com" onChange={(e) => setStudentEmail(e.target.value)}
                            >
                            </input>
                        </label>
                        <button type="submit">Fetch</button>
                    </form>

                    <h1 style={{textAlign: "center"}}><u>Personal Details :</u></h1>
                    {myStudentData.map((studentdetails) => (
                        <div>
                            <form onSubmit={handleSubmitPersonal}>
                                <label>
                                    Enroll No : 
                                    { studentdetails.enrollNo }
                                    <br/>
                                    New Enroll No :
                                    <input type={"text"} value={studentFormEnrollNo}
                                        onChange={(e) => setStudentFormEnrollNo(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <br/>
                                <label>
                                    Name : 
                                    { studentdetails.name }
                                    <br/>
                                    New Name :
                                    <input type={"text"} value={studentFormName}
                                        onChange={(e) => setStudentFormName(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <br/>
                                <label>
                                    Email : 
                                    { studentdetails.email }
                                    <br/>
                                    New Email :
                                    <input type={"text"} value={studentFormEmail}
                                        onChange={(e) => setStudentFormEmail(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <br/>
                                <label>
                                    Address : 
                                    { studentdetails.address }
                                    <br/>
                                    New Address :
                                    <input type={"text"} value={studentFormAddress}
                                        onChange={(e) => setStudentFormAddress(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <br/>
                                <label>
                                    Mobile No : 
                                    { studentdetails.mobileNo }
                                    <br/>
                                    New Mobile No :
                                    <input type={"text"} value={studentFormMobileNo}
                                        onChange={(e) => setStudentFormMobileNo(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <br/>
                                <button type="submit">Update</button>
                            </form>
                            <h1>Status : {personalUpdateStatus}</h1>
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
                    {(gotDetails) ? (
                        <div>
                            <h1>Add Courses</h1>
                            <form onSubmit={handleCourseAddSubmit}>
                                <label>
                                    Add Student's Course:
                                    <select value={addCourse} 
                                    onChange={(e) => setAddCourse(e.target.value)}
                                    >
                                        <option value="Select" selected>Select</option>
                                        { courseList() }
                                    </select>
                                    <input type={"text"} value={addCourseMarks} placeholder="100"
                                        onChange={(e) => setAddCourseMarks(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <button type="submit">Add</button>
                            </form>
                            <h1>Status : {courseAddStatus}</h1>
                        </div>

                    ) : (
                        <></>
                    ) }
                    {(gotDetails) ? (
                        <div>
                            <h1>Update Courses</h1>
                            <form onSubmit={handleCourseUpdateSubmit}>
                                <label>
                                    Update Student's Course:
                                    <select value={newCourse} 
                                    onChange={(e) => setNewCourse(e.target.value)}
                                    >
                                        <option value="Select" selected>Select</option>
                                        { courseList() }
                                    </select>
                                    <input type={"text"} value={newCourseMarks} placeholder="100"
                                        onChange={(e) => setNewCourseMarks(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <button type="submit">Update Course</button>
                            </form>
                            <h1>Status : {courseUpdateStatus}</h1>
                        </div>

                    ) : (
                        <></> 
                    ) }
                </section>
            )
            </div>
    )
}