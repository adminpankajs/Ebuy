import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './addProduct.css';
import axios from 'axios';
import Page401 from '../../page401.component';
import { useCookies } from "react-cookie";
var constants =  require('../../../constants/constants');
const ProductService = require("../../../services/ProductService.js");
const AuthService = require("../../../services/AuthService");

export default function AddProduct(props) {
    var fs = require('fs');
    const [status, setStatus] = useState('');
    const [authen, setAuthen] = useState(false);
    const [cookies, setCookies] = useCookies();
    const [productTypes, setProductTypes] = useState([]);
    const [productSubTypes, setProductSubTypes] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(1);
    const [subCategory, setSubCategory] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [features, setFeatures] = useState([]);
    const [feature, setFeature] = useState('');
    const [uploadFile, setUploadFile]  = useState();
    useEffect(() => {
        if(cookies.role === 'seller') {
            AuthService.AuthToken(cookies.accessToken,cookies.role)
                .then((result) => {
                    setAuthen(true);
                    setProductTypes(constants.productCategory);
                })
        }
    },[cookies]);

    
    useEffect(() => {
        console.log(category);
        setProductSubTypes(constants.productSubCategory[parseInt(category)]);
        console.log(productSubTypes);
    },[category]);
    
    function addNewFeature() {
        if(feature != '') {
            setFeatures([...features,feature]);
            setFeature('');
            document.getElementById('feature').value = '';
        }
    }

    async function saveData() {
        var formData = new FormData();
        formData.append('myFile',uploadFile);
        formData.append('product_name',name);
        formData.append('price',price);
        // formData.append('features',features);
        formData.append('serial_no',serialNumber);
        formData.append('product_type',category);
        formData.append('sub_category',subCategory);

        for (var i = 0; i < features.length; i++) {
            formData.append('features', features[i]);
        }

        try {
            axios.post('http://localhost:5000/product/addProduct',formData)
                .then((res) => {
                    console.log('File uploaded');
                    setStatus('Product Added.')
                    setTimeout(() => {
                        setStatus('');
                    }, 1000);
                })
        }
        catch(err) {
            console.log(err);
        }
    }
    
    return (
        <>
        { authen ? (
        <div className="addProduct">
            <div className="addProduct-form">
                <div className="addProduct-mainHeading">
                    Add New Product
                </div>
                <div className="addProduct-form-item">
                    <input onChange={(e) => {setName(e.target.value)}} required type={"text"} placeholder={"Name"}></input>
                </div>


                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <div style={{width: "45%"}} className="addProduct-form-item">
                        <select className="addProduct-form-typeSelect" name="types"
                        onChange={(e) => {setCategory(e.target.value)}}>
                            <option>Select Product Category</option>
                            {productTypes.map((type) => (
                                <option value={type.typeValue}>{type.typeName}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{width: "45%"}} className="addProduct-form-item">
                        <select className="addProduct-form-typeSelect" name="types"
                        onChange={(e) => {setSubCategory(e.target.value)}}>
                            <option>Select Product Sub-Category</option>
                            {productSubTypes.map((type) => (
                                <option value={type.subTypeValue}>{type.subTypeName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="addProduct-form-item">
                    <input onChange={(e) => {setPrice(e.target.value)}} required type={"number"} placeholder={"Cost"}></input>
                </div>

                <div className="addProduct-form-item">
                    <input onChange={(e) => {setSerialNumber(e.target.value)}} required style={{textTransform : "uppercase"}} type={"text"} placeholder={"Serial Number"}></input>
                </div>
                <div className="addProduct-form-item">
                    <input id="feature" name="feature" type={"text"} placeholder={"Features"} onChange={(e) => {setFeature(e.target.value)}}></input>
                    <button style={{margin: "5px"}} onClick={addNewFeature}>Add Features</button>
                </div>
                <div style={{fontSize: "1.25vw", margin : "5px"}}>
                    Display Features :
                </div>
                <div style={{fontSize: "1.4vw",color: "grey", backgroundColor: "whitesmoke", margin : "5px", minHeight : "1vw", width: "100%"}}>
                    {
                        features.map((myFeature) => (
                            <div>{myFeature}</div>
                        ))
                    }
                </div>
                <label style={{alignItems: "flex-start", margin: "5px", fontSize: "1.5vw"}}>
                    Upload Image :
                    <input onChange={(e) => {setUploadFile(e.target.files[0]); console.log(e.target.files[0])}} required type="file" id="myFile" className="uploadFileBtn" name="myFile"></input>
                    <button style={{float: "right", margin: "5px"}} type="button" onClick={saveData} name="submitBtn" class="button submitButton  gsc_col-xs-12 gsc_col-md-12 "><div style={{fontWeight:"900"}}>Add Product</div></button>
                </label>
                <div style={{float: "right"}}>{status}</div>
                <br></br>
            </div>
        </div>
        ) : (
            <div>
                <Page401/>
            </div>
        )
        }
        </>
    )
}