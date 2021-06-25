import React, { useState, useEffect } from "react";
import "./Footer.css"
function Footer() {
    return(
        <div className="footer-container">
               <div className="footer-title"> Local Plates Was Developed By:</div>
               <div className="dev-container">
                    <a href="https://github.com/TranquilTort" target="_blank" title="Chris Regan GitHub" className="dev-info" >
                         Chris Regan
                    </a>
                    <a href="https://github.com/adamLovettApps" target="_blank" title="Adam Lovett GitHub" className="dev-info" >
                         Adam Lovett
                    </a>
                    <a href="https://github.com/jdaniel01" target="_blank" title="James Daniel GitHub" className="dev-info" >
                         James Daniel
                    </a>

               </div>
        </div>
    )
}
export default Footer;
