import React, { useState } from "react";
import { Link } from "react-router-dom";
import './home.component.css';
var constants =  require('../constants/constants');

export default function Home(props) {
    const [products, setProducts] = useState({})
    // setProducts({})
    return (
        <div style={{zIndex: "-1"}}>
            <div style={{position: "relative", overflow: "hidden"}}>
                <img style={{boxShadow: "inset 0px -20px black",width: "100%",height: "100%"}} src={constants.websiteImages+'/home.png'}></img>
                <div className="homepage-landing-left">New Arrival</div>
                <div className="homepage-landing-left-subheading">Google Pixel 6</div>
                {/* <img style={{width: "100%"}} src={constants.websiteProductImages+'/homepage/landing-homepage.png'}></img> */}
            </div>
            <h1 id="homepage-product-grid" className="center-text heading1">Categories</h1> 
            <div className="product-grid">
                <a href={"/product/categories/tv#tv-main"}>
                    <div className="product-grid-item">
                        <div className="product-grid-item-img">
                            <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/homepage/category_tv.jpg'}></img>
                        </div>
                        <div className="product-grid-item-details">
                            {/* <div>
                                Televisions
                            </div> */}
                        </div>
                        <div style={{float: "right"}}>
                            <button className="product-buy-link">Television</button>
                        </div>
                    </div>
                </a>
                <a href={"/product/categories/mobilePhone"}>
                    <div className="product-grid-item">
                        <div className="product-grid-item-img">
                            <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/homepage/category_mobile_phone.jpeg'}></img>
                        </div>
                        <div className="product-grid-item-details">
                            {/* <div>
                                Laptop
                            </div>
                            <div style={{float: "right"}}>
                                Rs. 40000
                            </div> */}
                        </div>
                        <div style={{float: "right"}}>
                            <button className="product-buy-link">Mobile Phones</button>
                        </div>
                    </div>
                </a>
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/homepage/category_earphones.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        {/* <div>
                            Laptop
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 40000
                        </div> */}
                    </div>
                    <div style={{float: "right"}}>
                        <button className="product-buy-link">Earphones</button>
                    </div>
                </div>
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/homepage/category_shoes.png'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        {/* <div>
                            Laptop
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 40000
                        </div> */}
                    </div>
                    <div style={{float: "right"}}>
                        <button className="product-buy-link">Shoes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}