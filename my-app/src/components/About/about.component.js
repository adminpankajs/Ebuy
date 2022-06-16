import React, { useContext, useEffect, useState } from "react";
import './about.component.css';

export default function About() {
    return(
        <section className="about-main">
            <div className="about-card">
                <div className="about-card-heading">
                    About Us
                </div>
                <div className="about-card-message">
                    Our main objective of making this system is to make a highly reliable and easily accessible portal where the sellers can easily manage and keep records of transactions and perform the selling of goods online and the customers be able to purchase online.
                </div>
            </div>
        </section>
    )
}