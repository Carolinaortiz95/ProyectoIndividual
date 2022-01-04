import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";


export default function Card({ name, diet, image, id }) {
    return (
        <div className={style.card}>
            <Link to={`recipes/${id}`}></Link>
            <h3>{name}</h3>
            {diet.map((e) => <h5 className={style.diet}>{e.name}</h5>)}
            <img className={style.image} src={image} alt="img not found" />
        </div>
    );
}