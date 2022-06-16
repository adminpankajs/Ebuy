import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './tvProductList.css';
var constants =  require('../../../constants/constants');
const ProductService = require("../../../services/ProductService.js");

export default function TvProductList(props) {
    const [products, setProducts] = useState([])
    const { sub_category }  = useParams();
    useEffect(() => {
        console.log('Ans : '+constants.productSubCategories[sub_category]);
        const params = {
            sub_category : constants.productSubCategories[sub_category]
        };
        ProductService.getAllProducts(params)
            .then((res)=> {
                setProducts(res);
            })
            .catch((err) => {
                console.log(err);
            })
    },[sub_category])

    return (
        <div style={{zIndex: "0"}}>
            <h1 id="tv-main" className="center-text heading1">{ constants.productSubCategories[constants.productSubCategories[sub_category]] }</h1> 
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