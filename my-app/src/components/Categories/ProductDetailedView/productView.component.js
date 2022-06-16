import React, { useContext, useEffect, useState } from "react";
import './productView.css';
import UserContext from '../../../services/ContextService';
import { useNavigate,Link, Navigate } from "react-router-dom";
import '../../../constants/constants.css'
import { useParams } from "react-router-dom";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useCookies } from "react-cookie";
import axios from "axios";
ChartJS.register(...registerables);
var constants = require("../../../constants/constants.js")
const AuthService = require("../../../services/AuthService");
const ProductService = require("../../../services/ProductService.js");

export default function ProductDetailedView(props) {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [ cookies, setCookies ] = useCookies();
    const [userName ,setUserName ] = useContext(UserContext);
    const [product, setProduct] = useState({
        product_id : 0,
        product_details : {serial_no : '',features:[],price:0},
        product_name : '',
        product_img_link : 'blank',
        launch_date : ''
    });
    useEffect(() => {
        console.log('USER IS :: ')
        console.log(userName)
        ProductService.getProductById({product_id : productId})
            .then((res)=> {
                if(res && res.length>0) {
                    setProduct({
                        product_id : res[0].product_id,
                        product_details: res[0].product_details, 
                        product_name: res[0].product_name,
                        product_img_link: res[0].product_img_link,
                        launch_date: res[0].launch_date
                    });
                }
                let rating = product.product_rating ? product.product_rating : 4;
                for(var i=0; i<rating; i++) {
                    document.getElementsByClassName('fa-star')[i].className += ' checked';
                }
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    const addToCart = async() => {
        // const params = {
        //     customer_id = 
        // }
        console.log(cookies);
        try {
            AuthService.AuthToken(cookies.accessToken,cookies.role)
                .then((result) => {
                    ProductService.addToCart({product_id : product.product_id, customer_id : result[0].customer_id})
                    navigate(`/customer/viewCart/${result[0].customer_id}`)
                })
        }
        catch(err) {
            alert('Something went wrong !! \n'+err);
        }
    }

    return(
        <div className="product-view-main">
            <div className="product-view-grid">
                <div className="product-view-img">
                    <img className="product-view-img-props" alt="Error loading image" src={`${constants.websiteProductImages}uploads/${product.product_img_link}`}></img>
                </div>
                <div className="product-view-details">
                    <div><b>{product.product_name}</b></div>


                    <div style={{fontSize:"1.2vw",textTransform: "capitalize"}}>{product.product_details.serial_no}</div>
                    <div>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                    
                    <Line 
                        data={{
                            labels: ['10-01-22','10-01-22','10-01-22','10-01-22'],
                            datasets: [
                                {
                                  label: 'Price',
                                  backgroundColor: 'rgba(0,0,0,1)',
                                  borderColor: 'rgba(0,0,0,1)',
                                  borderWidth: 2,
                                  data: [35200, 19990, 28500,50800]
                                }
                            ],
                        }}
                        height={50}
                        width={150}
                        options = {{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            elements : {
                                line: {
                                    tension: 0.4
                                }
                            }
                        }}
                    />
                    <div>
                        <b>Features</b>
                        <div style={{fontSize: "1vw"}}>
                            {
                                product.product_details.features.map((feature) => (
                                    <div>
                                        {feature}
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                    <br></br>
                    <div><b>M.R.P : ₹{Number(product.product_details.price).toLocaleString('en-IN')}</b></div>
                    <div className="product-buy">
                        <button style={{ cursor: "pointer" }} onClick={addToCart} className="product-buy-button"><b>Add to Cart</b></button>
                        <button style={{backgroundColor:"#f34653"}} className="product-buy-button websiteButton1"><b><Link style={{color:"white"}} to={'/'}>Buy Now</Link></b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}