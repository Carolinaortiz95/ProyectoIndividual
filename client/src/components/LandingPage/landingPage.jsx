import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

export default function LandingPage() {
    return (
        <div className={style.full}>
            <h1 className={style.title}>Ready to find the ideal recipe?</h1>
            <Link to="/home">
                <button className={style.button}>START</button>
            </Link>
        </div>
    )
}