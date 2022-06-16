import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
var constants =  require('../../constants/constants');
const ProductService = require("../../services/ProductService.js");

export default function SearchWeb(props) {
    const [products, setProducts] = useState([])
    const { searchKeyword }  = useParams();
    useEffect(() => {
        const params = {
            searchKeyword : searchKeyword
        };
        ProductService.searchProductByName(params)
            .then((res)=> {
                setProducts(res);
            })
            .catch((err) => {
                console.log(err);
            })
    },[searchKeyword])

    return (
        <div style={{zIndex: "0"}}>
            <h1 id="tv-main" className="center-text heading1">Televisions</h1> 
            <div style={{fontSize: "1.25vw", fontWeight: "900"}} className="product-grid">
                {products.map((product) => (
                    <div>
                        <a href={`/product/view/${product.product_id}`}>
                            <div className="product-grid-item">
                                <div className="product-grid-item-img">
                                    <img className="product-grid-item-img-props" alt="Error" src={`${constants.websiteProductImages}${constants.imagesHelper}/${product.product_img_link}`}></img>
                                </div>
                                <div className="product-grid-item-details">
                                    <div>
                                        {product.product_name}
                                    </div>
                                    <div style={{float: "right"}}>
                                        Rs. {Number(product.product_details.price).toLocaleString('en-IN')}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}