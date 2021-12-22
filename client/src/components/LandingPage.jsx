import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

export default function LandingPage (){
    return (
        <div className={styles.full}>
       <h1 className={styles.title}>Ready to find the ideal recipe?</h1>
       <Link to = "/home">
           <button className={styles.button}>START</button>
       </Link>
        </div>
    )
}