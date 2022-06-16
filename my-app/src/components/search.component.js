import React, {useEffect, useState } from "react";


export default function SearchList(){
    
    const [scores, setScores] = useState([]);
    const [querySearch_EnrollNo, setQuerySeach_EnrollNo] = useState("");
    const [querySearch_Name, setQuerySeach_Name] = useState("");
    const [querySearch_Email, setQuerySeach_Email] = useState("");
    const [querySearch_Subject, setQuerySeach_Subject] = useState("");
    const [querySearch_Score, setQuerySeach_Score] = useState("");
    const [querySearch_Address, setQuerySeach_Address] = useState("");
    const [querySearch_MobileNo, setQuerySeach_MobileNo] = useState("");
    const [sort_Name, setSort_Name] = useState("1");
    const [sort_Email, setSort_Email] = useState("0");
    const [sort_Subject, setSort_Subject] = useState("0");
    const [sort_Score, setSort_Score] = useState("0");
    const [sort_MobileNo, setSort_MobileNo] = useState("0");
    
    // Fetch of all student records with their score details.
    useEffect(() => {
        var myparams = {queries : {}, sorting: {name: 1}};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };
        fetch('http://localhost:5000/score/getAllWithStudentData',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setScores(res)
            })
            .catch((err) => {
                console.log(err);
            })
        },[])
    
    // Handles the searching of students with specific queries and sorting methods on them.
    const handleSubmit = (event) => {
        event.preventDefault();
        var myparams = {queries : {}, sorting: {}};
        var sortChecker = true;
        if(querySearch_EnrollNo!=="") {
            myparams.queries.enrollNo = Number(querySearch_EnrollNo)
        }
        if(querySearch_Name!=="") {
            myparams.queries.name = querySearch_Name
        }
        if(querySearch_Address!=="") {
            myparams.queries.address = querySearch_Address
        }
        if(querySearch_MobileNo!=="") {
            myparams.queries.mobileNo = Number(querySearch_MobileNo)
        }
        if(querySearch_Email!=="") {
            myparams.queries.email = querySearch_Email
        }
        if(querySearch_Subject!=="") {
            myparams.queries.subject = querySearch_Subject
        }
        if(querySearch_Score!=="") {
            myparams.queries.score = Number(querySearch_Score)
        }
        if(sort_Name!=="0") {
            sortChecker = false;
            myparams.sorting.name = Number(sort_Name)
        }
        if(sort_Email!=="0") {
            sortChecker = false;
            myparams.sorting.email = Number(sort_Email)
        }
        if(sort_Subject!=="0") {
            sortChecker = false;
            myparams.sorting.subject = Number(sort_Subject)
        }
        if(sort_Score!=="0") {
            sortChecker = false;
            myparams.sorting.score = Number(sort_Score)
        }
        if(sort_MobileNo!=="0") {
            sortChecker = false;
            myparams.sorting.mobileNo = Number(sort_MobileNo)
        }

        if(sortChecker) {
            myparams.sorting.name = 1
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(myparams)
        };


        fetch('http://localhost:5000/score/getAllWithStudentData',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setScores(res)
            })
            .catch((err) => {
                console.log(err);
        })
        return;
    }

    return (
        <div className="student-all">
            <div>
                <h2>Search Records</h2>
            </div>
            <h3>Search Options</h3>
            <form style={{textAlign: "center"}} onSubmit={handleSubmit}>
                <label>
                    Queries :
                    <br/>
                    <input type={"text"} placeholder="enrollment no"
                        value={querySearch_EnrollNo} onChange={(e) => setQuerySeach_EnrollNo(e.target.value)}
                    ></input>
                    <input type={"text"} placeholder="address"
                        value={querySearch_Address} onChange={(e) => setQuerySeach_Address(e.target.value)}
                    ></input> 
                    <input type={"text"} placeholder="mobile no"
                        value={querySearch_MobileNo} onChange={(e) => setQuerySeach_MobileNo(e.target.value)}
                    ></input>  
                    <input type={"text"} placeholder="name"
                        value={querySearch_Name} onChange={(e) => setQuerySeach_Name(e.target.value)}
                    ></input>
                    <input type={"text"} placeholder="email"
                        value={querySearch_Email} onChange={(e) => setQuerySeach_Email(e.target.value)}
                    ></input>
                    <input type={"text"} placeholder="score"
                        value={querySearch_Score} onChange={(e) => setQuerySeach_Score(e.target.value)}
                    ></input>   
                    <input type={"text"} placeholder="subject"
                        value={querySearch_Subject} onChange={(e) => setQuerySeach_Subject(e.target.value)}
                    ></input>  
                    <br/>
                    <br/>
                    Soring :  
                    <br/>
                    Name :
                    <select value={sort_Name }
                    onChange={(e) => setSort_Name(e.target.value)}
                    >
                        <option value="0">None</option>
                        <option value="1" selected>Asc</option>
                        <option value="-1">Desc</option>
                    </select> 
                    Email :
                    <select value={sort_Email }
                    onChange={(e) => setSort_Email(e.target.value)}
                    >
                        <option value="0" selected>None</option>
                        <option value="1">Asc</option>
                        <option value="-1">Desc</option>
                    </select> 
                    Subject :
                    <select value={sort_Subject }
                    onChange={(e) => setSort_Subject(e.target.value)}
                    >
                        <option value="0" selected>None</option>
                        <option value="1">Asc</option>
                        <option value="-1">Desc</option>
                    </select>
                    Score :
                    <select value={sort_Score }
                    onChange={(e) => setSort_Score(e.target.value)}
                    >
                        <option value="0" selected>None</option>
                        <option value="1">Asc</option>
                        <option value="-1">Desc</option>
                    </select> 
                    Mobile No :
                    <select value={sort_MobileNo }
                    onChange={(e) => setSort_MobileNo(e.target.value)}
                    >
                        <option value="0" selected>None</option>
                        <option value="1">Asc</option>
                        <option value="-1">Desc</option>
                    </select> 
                </label>
                <br/>
                <br/>
                <button type="submit">Search</button>

            </form>
            <br />
            <table cellSpacing={33} className="table">
                <thead className="thead">
                    <tr>
                        <th>Enroll No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile No</th>
                        <th>Subject</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {scores.map((studentdetails) => (
                    <tr>
                        <td>{studentdetails.enrollNo}</td>
                        <td>{ studentdetails.name }</td>
                        <td>{studentdetails.email}</td>
                        <td>{studentdetails.address}</td>
                        <td>{studentdetails.mobileNo}</td>
                        <td>{studentdetails.subject}</td>
                        <td>{studentdetails.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
        </div>
    )
}