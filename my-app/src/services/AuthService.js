// Helps to provide authentication in the project

function AuthToken(params,role) {
    console.log('AuthToken')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: params})
    };
    
    return fetch(`http://localhost:5000/auth/${role}/verifyToken`,requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "TokenFailed";
    })
}

// Verifies the token for staff user.
function AuthTokenStaff(params) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: params})
    };
    
    return fetch('http://localhost:5000/auth/customer/verifyToken',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "TokenFailed";
    })
}

// Verifies the token for student user.
function AuthTokenStudent(params) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: params})
    };

    return fetch('http://localhost:5000/auth/seller/verifyToken',requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            return "TokenFailed";
    })
}


module.exports = { AuthToken, AuthTokenStaff, AuthTokenStudent };