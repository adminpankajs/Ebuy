async function getCart(params) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({customer_id: params.customer_id, is_payed: params.is_payed})
    };
    
    return await fetch('http://localhost:5000/customer/getCart',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "Failed";
    })
}

module.exports = { getCart };