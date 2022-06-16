async function getAll(params) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    fetch('http://localhost:5000/dbHelper/getAll',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "Failed";
    })
}

module.exports = { getAll };