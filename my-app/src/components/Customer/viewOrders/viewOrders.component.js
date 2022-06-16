import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './viewOrders.css';
import axios from 'axios';
var constants =  require('../../../constants/constants');
const ProductService = require("../../../services/ProductService.js");
const CustomerService = require("../../../services/CustomerService.js");

export default function ViewOrders(props) {
    const [products, setProducts] = useState([]);
    const { customer_id }  = useParams();
    useEffect(() => {
        const params = {
            customer_id : Number(customer_id),
            is_payed : true
        };
        CustomerService.getCart(params)
            .then((res)=> {
                setProducts(res);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])
    
    return (
        <div className="addProduct">
            <div className="addProduct-form">
                <div className="addProduct-mainHeading">
                    Your Orders
                </div>
                {products.map((product) => (
                    <div className="viewCart-product" style={{fontSize: "1.4vw",color: "grey", backgroundColor: "whitesmoke", margin : "5px", minHeight : "1vw", width: "100%", padding: "1vw 0vw"}}>
                        <img className="viewCart-img" src={`${constants.websiteProductImages}${constants.imagesHelper}/${product.product_img_link}`}></img>
                        <div>
                            {product.product_name}
                        </div>
                        <div>
                        ₹{Number(product.product_details.price).toLocaleString('en-IN')}
                        </div>
                        <div style={{textAlign:"center"}}>
                            1
                        </div>
                        <div>
                        ₹{Number(product.product_details.price).toLocaleString('en-IN')}
                        </div>
                        <div>
                            <Link style={{color: "#f34653"}} to={'/new'}>Rate/Review</Link>
                        </div>
                    </div>
                ))}
                {/* <div style={{fontSize:"1.5vw",textAlign:"right"}}>
                    Grand Total : ₹{Number(products.reduce((sum, i) => (
                                    sum += Number(i.product_details.price)
                                    ), 0)).toLocaleString('en-IN')}
                </div> */}
                {/* <label style={{alignItems: "flex-start", margin: "5px", fontSize: "1.5vw"}}>
                    Upload Image :
                    <input onChange={(e) => {setUploadFile(e.target.files[0]); console.log(e.target.files[0])}} required type="file" id="myFile" className="uploadFileBtn" name="myFile"></input>
                </label> */}
                <button style={{float: "right"}} type="button" name="submitBtn" class="button submitButton  gsc_col-xs-12 gsc_col-md-12 "><div style={{fontWeight:"900"}}>Explore New</div></button>
                <br></br>
            </div>
        </div>
    )
}