// Helps to provide authentication in the project

// Verifies the token for staff user.

async function searchProductByName(params) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({searchKeyword: params.searchKeyword})
    };
    
    return await fetch('http://localhost:5000/product/searchProduct',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "Failed";
    })
}

async function getProductById(params) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({product_id: params.product_id})
    };
    
    return await fetch('http://localhost:5000/product/getProductById',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "Failed";
    })
}

async function getAllProducts(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    };
    
    return await fetch('http://localhost:5000/product/getAllByCategory',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "FailedbHelper/getAlld";
    })
}

async function addProduct(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data'},
        body: JSON.stringify(params)
    };
    
    return await fetch('http://localhost:5000/product/addProduct',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "FailedbHelper/getAlld";
    })

}

async function addToCart(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    };
    
    return await fetch('http://localhost:5000/order/add',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "FailedbHelper/getAlld";
    })

}



module.exports = { getProductById, getAllProducts, addProduct, searchProductByName, addToCart };