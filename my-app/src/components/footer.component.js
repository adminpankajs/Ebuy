import React from "react";
import './footer.component.css'

// static footer persists in whole system.
export default function Footer(params) {
    return(
        <div className="myBottom">
            <div>
                Copyright @ 2022. Ebuy Ltd.
            </div>
            <div>
                All rights reserved
                Licensed : 2020-2025
            </div>
        </div>
    )
}